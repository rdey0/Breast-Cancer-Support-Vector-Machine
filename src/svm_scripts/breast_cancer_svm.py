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


def make_meshgrid(x, y,h=.02):
    
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



def optimize_rbf(x_train, x_test, y_train, y_test, max_degree, max_cost):
    # create a dictionary to store the optimal parameters
    runtimes = []
    results = []
    # test every combination of degree and cost parameters
    for degree in range(1, max_degree + 1):
        for cost in range(1, max_cost +1):
            # create rbf model
            clf = svm.SVC(kernel='rbf', degree = degree, C=cost)
            rbf_model = clf.fit(x_train, np.ravel(y_train))
            # make predictions with the rbf model and record runtime
            start_time = time.time()
            preds = rbf_model.predict(x_test)
            runtime = time.time() - start_time
            runtimes.append(runtime)
            # gauge accuracy of the rbf model
            accuracy = accuracy_score(preds, y_test)
            #print("Testing [degree:", degree, "cost:", cost, "accuracy:", accuracy, "Runtime:", runtime,"]")
            results.append({"Degree":degree, "Cost":cost, "Accuracy":accuracy, "Runtime":runtime})
    # turn results array into a dataframe and sort by accuracy from greatest to least
    results = pd.DataFrame(results)
    results_sorted = results.sort_values(by=['Accuracy'], ascending=False)
    best_degree_param = results_sorted.iloc[0,0]
    best_cost_param = results_sorted.iloc[0,1]
    max_accuracy = results_sorted.iloc[0,2]
    #print(results[results.Accuracy == results.Accuracy.max()])
    #print("Runtime stats Mean:", stats.mean(runtimes), "Median:", stats.median(runtimes), 
            #"Variance:", stats.variance(runtimes), "Standard Deviation:", stats.stdev(runtimes))
    #print("Optimal Degree:", best_degree_param, "Optimal Cost:", best_cost_param, "Accuracy:", max_accuracy)
    return best_degree_param, best_cost_param, max_accuracy, results

def 
# load cancer dataset
cancer = datasets.load_breast_cancer()
# convert cancer dataset to dataframe
data = np.c_[cancer.data, cancer.target]
columns = np.append(cancer.feature_names, ["target"])
cancer = pd.DataFrame(data, columns=columns)
# separate X and Y datasets
#X = cancer.iloc[:,0:30]
X = cancer.loc[:,['mean concave points', 'worst concave points']]
Y = cancer.iloc[:,30:31]
# split data into test and training sets
x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.7)
# find the most optimal degree and cost parameters
best_degree, best_cost, accuracy, results= optimize_rbf(x_train, x_test, y_train, y_test, 7, 30)
yes_cancer = cancer.loc[cancer['target'] == 0.0]
no_cancer = cancer.loc[cancer['target'] == 1.0]
# make optimal model
results_sorted = results.sort_values(by=['Accuracy'], ascending=True)
results_max = results[results.Accuracy == results.Accuracy.max()]
models = (svm.SVC(kernel='rbf', degree = results_max.iloc[0,1], C=results_max.iloc[0,1]), 
        svm.SVC(kernel='rbf', degree = results_max.iloc[1,0], C=results_max.iloc[1,1]), 
        svm.SVC(kernel='rbf', degree = results_max.iloc[2,0], C=results_max.iloc[2,1]),
        svm.SVC(kernel='rbf', degree = results_sorted.iloc[0,0], C=results_sorted.iloc[0,1]))
models = (clf.fit(x_train, np.ravel(y_train)) for clf in models)
# create title for the plots
titles = ('(1st Best RBF SVM) Degree=' + str(results_max.iloc[0,0]) +
            ' and Cost=' + str(results_max.iloc[0,1]),
        '(2nd Best RBF SVM) Degree=' + str(results_max.iloc[1,0]) +
            ' and Cost=' + str(results_max.iloc[1,1]),
        '(3rd Best RBF SVM) Degree=' + str(results_max.iloc[2,0]) +
            ' and Cost=' + str(results_max.iloc[2,1]),
        '(Worst RBF SVM) Degree=' + str(results_sorted.iloc[0,0]) +
            ' and Cost=' + str(results_sorted.iloc[0,1]))

# Set-up 2x2 grid for plotting.
fig, sub = plt.subplots(2, 2)
plt.subplots_adjust(wspace=0.4, hspace=0.4)
# Print test results
print("Test Results")
print()
for i in range(results.shape[0]):
    row = results[i:i+1]
    print("{ Degree", row.iloc[0]['Degree'], " Cost:",  row.iloc[0]['Cost'],
            " Accuracy:", row.iloc[0]['Accuracy'], " Runtime:", row.iloc[0]['Runtime'], "}")
# make plot
xx, yy = make_meshgrid(X.iloc[:,0], X.iloc[:,1])
#print ('xmin:', xx.min(), 'xmax:', xx.max(), 'ymin:', yy.min(), 'ymax:', yy.max())
for clf, title, ax in zip(models, titles, sub.flatten()):
    plot_contours(ax, clf, xx, yy, cmap=plt.cm.coolwarm, alpha=0.8)
    ax.scatter(yes_cancer.loc[:,['mean concave points']], yes_cancer.loc[:,['worst concave points']], 
        label="Cancer Positive", color="blue", edgecolors='k')
    ax.scatter(no_cancer.loc[:,['mean concave points']], no_cancer.loc[:,['worst concave points']], 
        label="Cancer Negative", color="red", edgecolors='k')
    ax.set_xlim(-0.15, 0.35)
    ax.set_ylim(-0.15, 0.55)
    ax.set_xlabel('Mean Concave Points')
    ax.set_ylabel('Worst Concave Points')
    ax.set_title(title)
    ax.legend(loc="upper right")
plt.show()