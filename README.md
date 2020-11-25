# [Cancer Classifier](https://rdey0.github.io/cancer_classifier/)
<div>
    <img src='https://img.shields.io/github/package-json/v/rdey0/cancer_classifier'>
    <img src='https://img.shields.io/github/deployments/rdey0/cancer_classifier/github-pages'>
    <img src='https://img.shields.io/badge/React-v17.0.1-blue'>
    <img src='https://img.shields.io/badge/Express-v4.16.1-blue'>
    <img src='https://img.shields.io/badge/Python-v3.8.5-blue'>
    <img src='https://img.shields.io/github/languages/top/rdey0/cancer_classifier'>
    <img src='https://img.shields.io/github/last-commit/rdey0/cancer_classifier'>
    <img src='https://img.shields.io/badge/Topic-Machine%20Learning-green'>
</div>

<div align='center'>
    <img src='./client/src/assets/banner.gif'>
</div>

<h1></h1>

## [Demo](https://rdey0.github.io/cancer_classifier/)

## Description

Customize your own machine learning model to detect the presence of cancer. This cancer classifier uses a support vector machine trained on data and hyperparameters of your choosing. Play around and see what combinations of data sets and hyperparameters allow you to produce the most accurate classifications.


## How to Use

1. **Select Variables**: Choose X and Y variable datasets from the "X Variable" and "Y Variable" select boxes. These are the datasets that your machine learning model will learn from. Don't worry about which dataset is the X or the Y variable, it's only the combination of data sets that matters

<br>
<div align='center'>
    <img src='./client/src/assets/select_variables.png'>
</div>
</br>

2. **Select Hyperparameters**: Use the sliders to choose your Cost and Degree hyperparameters. Cost determines how heavily to punish your model for incorrectly classifying data points. The higher the cost, the greater the punishment. Degree determines how flexible the decision boundary can be. The higher the degree, the 'curvier' the separating line may appear.

<br>
<div align='center'>
    <img src='./client/src/assets/select_parameters.gif'>
</div>
</br>
<div align='center'>
    <img src='./client/src/assets/metrics.PNG'>
    <div align='center'><b>The metrics panel shows you your model accuracy, selected cost, and selected degree</b></div>
</div>
</br>

3. **Graph**: Click the graph button and a model will be trained with your chosen parameters and make classification predictions. The graph will update to show where your model believes cancer positive and cancer negative patients are located. Blue regions are where your model thinks cancer positive patients are while red regions are where your model thinks cancer negative patients are.

<br>
<div align='center'>
    <img src='./client/src/assets/graph.gif'>
</div>
</br>

## How it was Made

React was used as the front-end framework. The machine learning algorithms were written in python and are run on a Node.js server. The Node server runs the python scripts and returns the resulting graph and outcome metrics via API calls.
