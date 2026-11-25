# Simple linear regression with F1 data

Small exercise that loads the 2023 Spanish GP qualifying session with FastF1,
filters representative laps and fits total lap time from sector-one time using
scikit-learn's `LinearRegression`.

From this directory, in your Python environment:

```powershell
python -m pip install fastf1 pandas numpy matplotlib scikit-learn
python f1_simple_linear_regression.py
```

The initial download requires network access. The script creates `cache_fastf1/`
and opens a Matplotlib figure.

The reported R² uses the same observations used to fit the model. It demonstrates
fitting and visualization, not held-out predictive performance. Sector one is also
part of total lap time, so the relationship should not be interpreted as an
independent pre-race predictor.

[Back to machine learning](../README.md)
