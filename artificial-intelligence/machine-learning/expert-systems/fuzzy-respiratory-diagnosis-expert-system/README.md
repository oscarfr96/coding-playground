# Fuzzy-rule inference exercise

Educational implementation of a small fuzzy expert system using Python's standard
library. Symptom names and disease labels provide a concrete example for studying
rule evaluation; the rules are hand-written and not clinically validated.

## Run

From this directory:

```powershell
python fuzzy_expert_system.py
```

No external packages, dataset download or model training are required.

## How the example works

- Inputs are membership values between 0 and 1, supplied in the script.
- A positive condition uses its value; a negative condition uses `1 - value`.
- A rule combines its conditions with `min`.
- Several rules for the same label combine with `max`.
- The final demonstration selects the label with the largest score.

These scores are fuzzy membership values, not disease probabilities or diagnostic
accuracy estimates. The final selection is a simple maximum, not a full clinical
inference or validated defuzzification system.

[Back to machine learning](../../README.md)
