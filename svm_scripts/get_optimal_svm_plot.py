from sklearn import datasets
from sklearn import svm
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import warnings
import matplotlib.pyplot as plt
import time
import statistics as stats
import sys
import os
"""
Create a mesh of points to plot in

@x: data to base x-axis meshgrid on
@y: data to base y-axis meshgrid on
@h: stepsize for meshgrid, optional

Return: [xx, yy] where xx and yy are ndarrays 
"""
def make_meshgrid(x, y, h=.02):
    x_min, x_max = x.min() - 1, x.max() + 1
    y_min, y_max = y.min() - 1, y.max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))
    return xx, yy

"""
Plot the decision boundaries for a classifier.

@ax: matplotlib axes object
@clf: a classifier
@xx: meshgrid ndarray
@yy: meshgrid ndarray
@params: dictionary of params to pass to contourf, optional

Return: The prediction boundaries of the SVM
"""
def plot_contours(ax, clf, xx, yy, **params):
    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    out = ax.contourf(xx, yy, Z, **params)
    return out

def get_svm_accuracy(svm_model, x_test, y_test):
    preds = svm_model.predict(x_test)
    return accuracy_score(preds, y_test)


"""
Create and train an RBF SVM model

@x_train: x training data
@y_train: y training data
@degree: An integer which represents the degree parameter of the SVM
@cost: An integer which represents the cost parameter of the sVM

Return: The svm model
"""
def create_model(x_train, y_train, degree, cost):
    clf = svm.SVC(kernel='rbf', degree = degree, C=cost, gamma='auto')
    rbf_model = clf.fit(x_train, np.ravel(y_train))
    return rbf_model

"""
Calculates the lower and upper bound of a series of values. This is 
useful for setting axis limits like with ax.set_ylim(bottom,top)

@series: The pandas series of data to be analyzed
@marginfactor: A float which determines how large the border around the
    lower and upper limit is. A marginfactor of 0.2 would for example set a 
    20% border distance on both sides.

Return: [lower_limit_of_series, upper_limit_of_series]
"""
def get_axlims(series, marginfactor):
    minv = series.min()
    maxv = series.max()
    datarange = maxv-minv
    border = abs(datarange*marginfactor)
    maxlim = maxv+border
    minlim = minv-border
    return minlim,maxlim

def optimize_rbf(x1_label, x2_label, max_degree=5, max_cost=10):
    # Get data corresponding to given labels
    X = cancer.loc[:,[x1_label, x2_label]]
    # Split data into test and training sets
    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.4)
    # test every combination of degree and cost parameters
    best_degree = 1
    best_cost = 1
    max_accuracy = 0
    for degree in range(1, max_degree + 1):
        for cost in range(1, max_cost +1):
            # create rbf model
            clf = svm.SVC(kernel='rbf', degree = degree, C=cost, gamma='auto')
            rbf_model = clf.fit(x_train, np.ravel(y_train))
            preds = rbf_model.predict(x_test)
            # gauge accuracy of the rbf model
            accuracy = accuracy_score(preds, y_test)
            if accuracy > max_accuracy:
                best_degree = degree
                best_cost = cost
                max_accuracy = accuracy
    print(best_degree)
    print(best_cost)
    return best_degree, best_cost

# load script args
x1_label = sys.argv[1]
x2_label = sys.argv[2]
# load cancer dataset
cancer = pd.read_csv('./svm_scripts/cancer.csv')
# separate rows into cancer positive and cancer negative dataframes
yes_cancer = cancer.loc[cancer['target'] == 0.0]
no_cancer = cancer.loc[cancer['target'] == 1.0]
# get cancer result rows
Y = cancer.iloc[:,30:31]
# get svm parameters which result in highest prediction accuracy
best_degree, best_cost = optimize_rbf(x1_label, x2_label)
sys.stdout.flush()