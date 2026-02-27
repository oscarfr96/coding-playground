#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
This script demonstrates a simple fuzzy expert system for diagnosing respiratory illnesses.
It represents symptoms and diseases with fuzzy values (0.0 to 1.0) and uses a forward-chaining
inference engine. The engine evaluates rules, combines fuzzy values using min/max operators,
and attempts to provide a more nuanced output than a strict true/false system.

Please note: This is a simplified example for demonstration purposes. In a real scenario,
you might use dedicated libraries (like scikit-fuzzy) and more sophisticated methods for
defining membership functions, combining rules, and defuzzifying results. 
"""

# Possible diseases and symptoms:
# Diseases: flu, cold, pharyngitis
# Symptoms: fever, dry_cough, wet_cough, sore_throat, nasal_congestion, muscle_pain, sneezing

# Each symptom is represented with a fuzzy value: 0.0 (absent) to 1.0 (intense).

# Rules will be stored as a list of dicts:
# Each rule has:
# - conditions: a dict { symptom: expected_type, ... }
#   expected_type will just be the symptom name with a boolean indicating if we want it present or absent.
#   In a fuzzy system, we use the symptom's fuzzy value directly and combine them using min().
#
# - disease: a string representing the disease this rule supports.
#
# The inference engine will:
# 1. Take the fuzzy symptom values.
# 2. For each rule, compute the fuzzy support for that disease by using the min() of all involved symptoms,
#    optionally negating them by using (1 - value) if we want the absence of a symptom.
# 3. Combine multiple rules for the same disease by taking max() (OR) of their results.
#
# At the end, we get a fuzzy score for each disease.

import math

# Define fuzzy symptoms (this could be input from the user or another system)
# Adjust these values to test different scenarios.
symptoms = {
    "fever": 0.8,             # High fever
    "dry_cough": 0.4,         # Mild dry cough
    "wet_cough": 0.2,         # Slightly present wet cough
    "sore_throat": 0.7,       # Moderate sore throat
    "nasal_congestion": 0.6,  # Noticeable nasal congestion
    "muscle_pain": 0.9,       # Severe muscle pain
    "sneezing": 0.1           # Almost no sneezing
}

# Define fuzzy rules for diseases.
# Conditions are tuples of (symptom_name, desired_presence)
# desired_presence = True means we want that symptom present (use symptom value)
# desired_presence = False means we want that symptom absent (use (1 - symptom value))
rules = [
    {
        "disease": "flu",
        "conditions": [
            ("fever", True),
            ("muscle_pain", True),
            ("dry_cough", True)
        ]
    },
    {
        "disease": "cold",
        "conditions": [
            ("sneezing", True),
            ("nasal_congestion", True),
            ("wet_cough", True)
        ]
    },
    {
        "disease": "pharyngitis",
        "conditions": [
            ("sore_throat", True),
            ("fever", True)
        ]
    },
    {
        # Another rule for cold: sore throat but no fever and sneezing
        "disease": "cold",
        "conditions": [
            ("sore_throat", True),
            ("fever", False),
            ("sneezing", True)
        ]
    },
    {
        # Another rule for cold: dry cough, nasal congestion, but no muscle pain and no fever
        "disease": "cold",
        "conditions": [
            ("dry_cough", True),
            ("nasal_congestion", True),
            ("muscle_pain", False),
            ("fever", False)
        ]
    }
]

def evaluate_rule(rule, symptom_values):
    """
    Evaluate a single fuzzy rule against the symptom values.
    For each condition:
    - If desired_presence is True, we take the symptom value as is.
    - If desired_presence is False, we take (1 - symptom value).
    The rule's fuzzy result is the minimum of these values (fuzzy AND).
    """
    values = []
    for (symptom, desired) in rule["conditions"]:
        val = symptom_values.get(symptom, 0.0)
        if desired:
            # We want the symptom present
            # Just use val
            values.append(val)
        else:
            # We want the symptom absent
            # Use (1 - val)
            values.append(1.0 - val)
    # The final score for this rule is the min of all involved conditions
    return min(values) if values else 0.0


def infer_diseases(symptom_values, rules):
    """
    Infer fuzzy disease values given the symptom values and a set of rules.
    For each disease, we take the max (fuzzy OR) of the results of all rules
    that support that disease.
    """
    disease_scores = {}
    for rule in rules:
        d = rule["disease"]
        score = evaluate_rule(rule, symptom_values)
        if d not in disease_scores:
            disease_scores[d] = score
        else:
            disease_scores[d] = max(disease_scores[d], score)
    return disease_scores


def defuzzify_diseases(disease_scores):
    """
    This is a naive approach to choose one disease. We pick the one with the highest fuzzy score.
    In real fuzzy logic, you might have membership functions and a defuzzification step.
    Here we just pick the top disease.
    """
    if not disease_scores:
        return None, 0.0
    best_disease = max(disease_scores.items(), key=lambda x: x[1])
    return best_disease[0], best_disease[1]


# Run the inference
fuzzy_results = infer_diseases(symptoms, rules)

# Print fuzzy scores for each disease
print("Fuzzy disease scores:", fuzzy_results)

# Choose the disease with the highest score
disease, score = defuzzify_diseases(fuzzy_results)
if disease and score > 0:
    print(f"Most likely disease: {disease} with a fuzzy score of {score:.2f}")
else:
    print("No known disease inferred from the given fuzzy symptoms.")
