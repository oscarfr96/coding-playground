-- Fictional data for local development; safe to run again.
INSERT INTO public.teachers (teacher_id, name)
VALUES ('550e8400-e29b-41d4-a716-446655440001', 'Jane Smith')
ON CONFLICT (teacher_id) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO public.classes (class_id, name)
VALUES ('550e8400-e29b-41d4-a716-446655440002', 'Mathematics 2A')
ON CONFLICT (class_id) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO public.students (student_id, name, class_id, tutor_id, academic_status)
VALUES (
    '550e8400-e29b-41d4-a716-446655440003',
    'Alex Rivera',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001',
    'Good Standing'
)
ON CONFLICT (student_id) DO UPDATE
SET name = EXCLUDED.name,
    class_id = EXCLUDED.class_id,
    tutor_id = EXCLUDED.tutor_id,
    academic_status = EXCLUDED.academic_status;
