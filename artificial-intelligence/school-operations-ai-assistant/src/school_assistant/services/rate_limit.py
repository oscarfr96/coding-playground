"""Small per-process request limit for the assistant demonstration endpoint."""

import asyncio
from collections import deque
from time import monotonic
from uuid import UUID

RATE_LIMIT_REQUESTS = 10
RATE_LIMIT_WINDOW_SECONDS = 60

_requests_by_teacher: dict[UUID, deque[float]] = {}
_lock = asyncio.Lock()


class AssistantRateLimitExceeded(Exception):
    """Raised when a teacher exceeds the local assistant request budget."""

    def __init__(self, retry_after_seconds: int):
        self.retry_after_seconds = retry_after_seconds


async def enforce_assistant_rate_limit(teacher_id: UUID) -> None:
    """Allow at most ten requests per teacher in each rolling minute."""
    now = monotonic()
    cutoff = now - RATE_LIMIT_WINDOW_SECONDS

    async with _lock:
        # Remove expired timestamps and inactive teachers to keep this map bounded.
        for existing_teacher_id, timestamps in list(_requests_by_teacher.items()):
            while timestamps and timestamps[0] <= cutoff:
                timestamps.popleft()
            if not timestamps:
                del _requests_by_teacher[existing_teacher_id]

        timestamps = _requests_by_teacher.setdefault(teacher_id, deque())
        if len(timestamps) >= RATE_LIMIT_REQUESTS:
            retry_after = max(
                1,
                int(timestamps[0] + RATE_LIMIT_WINDOW_SECONDS - now + 0.999),
            )
            raise AssistantRateLimitExceeded(retry_after)

        timestamps.append(now)
