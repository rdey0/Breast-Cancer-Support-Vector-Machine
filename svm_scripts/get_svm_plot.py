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

def make_meshgrid(x, y, h=.02):
    
    """Create a mesh of points to plot in

    Parameters
    ----------
    x: data to base x-axis meshgrid on
    y: data to base y-axis meshgrid on
    h: stepsize for meshgrid, optional

    Returns
    -------
    xx, yy : ndarray
    """
    x_min, x_max = x.min() - 1, x.max() + 1
    y_min, y_max = y.min() - 1, y.max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))
    return xx, yy

def plot_contours(ax, clf, xx, yy, **params):
    """Plot the decision boundaries for a classifier.

    Parameters
    ----------
    ax: matplotlib axes object
    clf: a classifier
    xx: meshgrid ndarray
    yy: meshgrid ndarray
    params: dictionary of params to pass to contourf, optional
    """

    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])

    Z = Z.reshape(xx.shape)
    out = ax.contourf(xx, yy, Z, **params)
    return out

def get_svm_accuracy(svm_model, x_test, y_test):
    preds = svm_model.predict(x_test)
    return accuracy_score(preds, y_test)


"""
# Create and train an RBF SVM model
#
# @x_train: x training data
# @y_train: y training data
# @degree: An integer which represents the degree parameter of the SVM
# @cost: An integer which represents the cost parameter of the sVM
#
# Return: The svm model
"""
def create_model(x_train, y_train, degree, cost):
    # create rbf model
    clf = svm.SVC(kernel='rbf', degree = degree, C=cost, gamma='auto')
    rbf_model = clf.fit(x_train, np.ravel(y_train))
    return rbf_model


def set_axlims(series, marginfactor):
    """
    Fix for a scaling issue with matplotlibs scatterplot and small values.
    Takes in a pandas series, and a marginfactor (float).
    A marginfactor of 0.2 would for example set a 20% border distance on both sides.
    Output:[bottom,top]
    To be used with .set_ylim(bottom,top)
    """
    minv = series.min()
    maxv = series.max()
    datarange = maxv-minv
    border = abs(datarange*marginfactor)
    maxlim = maxv+border
    minlim = minv-border

    return minlim,maxlim

"""
# Update the svm model using the new parameters
#
# @x1_label: A string which represents the label name of a feature
# @x2_label: A string which represents the label name of a feature
# @degree: An integer which represents the degree parameter of the SVM
# @cost: An integer which represents the cost parameter of the sVM
#
# Return: The percent accuracy of the updated svm model
"""
def get_graph(x1_label, x2_label, degree, cost):
    # Get data corresponding to given labels
    X = cancer.loc[:,[x1_label, x2_label]]
    # Split data into test and training sets
    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.4)
    svm = create_model(x_train, y_train, degree, cost)
    # Create plot
    fig, ax = plt.subplots(1, 1)
    xx, yy = make_meshgrid(X.iloc[:,0], X.iloc[:,1])
    plot_contours(ax, svm, xx, yy, cmap=plt.cm.coolwarm, alpha=0.8)

    ax.scatter(yes_cancer.loc[:,[x1_label]], yes_cancer.loc[:,[x2_label]], 
        label="Cancer Positive", color="blue", edgecolors='k')
    ax.scatter(no_cancer.loc[:,[x1_label]], no_cancer.loc[:,[x2_label]], 
        label="Cancer Negative", color="red", edgecolors='k')
    xlim_min, xlim_max = set_axlims(cancer.loc[:,[x1_label]], 0.1)
    ax.set_xlim(float(xlim_min), float(xlim_max))
    ylim_min, ylim_max = set_axlims(cancer.loc[:,[x2_label]], 0.1)
    ax.set_ylim(float(ylim_min), float(ylim_max))
    ax.set_xlabel(x1_label)
    ax.set_ylabel(x2_label)
    ax.legend(loc="upper right")
    # Save the plot as an image
    plt.savefig('./graph/graph.png')
    print (get_svm_accuracy(svm, x_test, y_test))

# load script args
x1_label = sys.argv[1]
x2_label = sys.argv[2]
degree = int(sys.argv[3])
cost = int(sys.argv[4])

# load cancer dataset
cancer = pd.read_csv('./svm_scripts/cancer.csv')
#num_rows = len(cancer.index)
#num_delete = int(0.5 * num_rows)
#drop_indices = np.random.choice(cancer.index, num_delete, replace=False)
#cancer = cancer.drop(drop_indices)
# separate rows into cancer positive and cancer negative dataframes
yes_cancer = cancer.loc[cancer['target'] == 0.0]
no_cancer = cancer.loc[cancer['target'] == 1.0]
# get cancer result rows
Y = cancer.iloc[:,30:31]
# create an svm model with the given parameters and save the plot
get_graph(x1_label, x2_label, degree, cost)
sys.stdout.flush()