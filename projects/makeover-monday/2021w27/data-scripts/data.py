import os
import pandas as pd
import numpy as np
# from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from pprint import pprint
from rich import print as r_print

r_print("Exploring the [bold]2020 AP Exit Polls[/bold] dataset")
print("Loading...")

df = pd.read_csv("2020_ap_exit_polls_combined.csv", dtype={
    "Demographic": "string",
    "State": "string",
    "State Abbr": "string",
    "Winner": "string",
    "Biden %": "string",
    "Trump %": "string",
    "Biden Electoral Votes": "string",
    "Trump Electoral Votes": "string",
    "Electoral Votes Available": "string"
}, error_bad_lines=False)

pd.set_option("display.max.columns", None)
pd.set_option('display.max_rows', None)

print("Columns:")
pprint(list(df))

# print(df)

print("Preview:")
print(df.head(10))

column = "Demographic"
values = pd.unique(df[column])
count = len(values)

print(f"found {count:,} values in the {column} column")
print(values)

index = 0
total = len(df.groupby(column))

for i, x in df.groupby(column):
    index += 1
    demographic_lower = i.lower()
    p = os.path.join(os.getcwd(), f"data/{demographic_lower}.csv")
    # x[column].to_csv(p, index=False)
    x.to_csv(p, index=False)
