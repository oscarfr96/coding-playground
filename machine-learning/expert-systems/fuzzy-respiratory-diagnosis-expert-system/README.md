# Fuzzy Respiratory Diagnosis Expert System

This repository contains a simple fuzzy logic-based expert system designed to provide a preliminary diagnosis of common respiratory illnesses such as flu, cold, and pharyngitis. Unlike a strict boolean rule-based system, this approach uses fuzzy logic to handle uncertainty and varying intensities of symptoms. As a result, the system can produce more nuanced conclusions that better reflect the complexity of real-world clinical scenarios.

## Features

- **Fuzzy Symptom Representation:** Each symptom is assigned a value between 0.0 and 1.0, indicating the intensity or certainty of that symptom.
- **Basic Inference Engine:** The system uses a forward-chaining approach to evaluate predefined fuzzy rules and infer possible diseases.
- **Multiple Rules per Disease:** Each disease can be suggested by multiple rules. The system combines these rules using fuzzy logic operations (`min` for AND, `max` for OR).
- **Uncertainty Handling:** By applying fuzzy logic, the system can deal with partial presence/absence of symptoms, enabling more realistic and flexible reasoning.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/oscarfr96/fuzzy-respiratory-diagnosis-expert-system.git
