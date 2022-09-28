from cmath import pi
from contextlib import nullcontext
import math as m
from fractions import Fraction
from matplotlib import pyplot as plt
import numpy as np
#import pylatex as ltx
from inspect import currentframe, getframeinfo

def getcoefficients():
    print('(include the - sign for negative numbers)')
    a = 'Enter coefficient A: '
    b = 'Enter coefficient B:  '
    c = 'Enter coefficient C: '
    print('a: {}, b: {}, c: {}'.format(a, b, c))

def getsign(num, isleading):
    if num < 0 and not isleading:
        return ''
    if num > 1 and isleading:
        return '+'
    if num == 1 and isleading:
        return ''
    else:
        return '+'

def use_the_1(num, isleading):
    return '' if num == 1 and isleading else 1
    return a, b, c

def quadratic(A, B, C):
    print('quadratic equation: \n')
    print('y = {}x\u00b2 + {}x + {}'.format(A, B, C))
    print(' ')

    sum = (-B + m.sqrt((B * B) - (4 * A * C))) / (2 * A)
    diff = (-B - m.sqrt((B * B) - (4 * A * C))) / (2 * A)

    print("sum: {}, diff: {}".format(sum, diff))
    print(' ')

    fractionsum = Fraction(sum)
    print('fractionsum: {}'.format(fractionsum))
    f1gcd = m.gcd(fractionsum.numerator, fractionsum.denominator)
    print(' f1gcd: {}'.format(f1gcd))
    print("fractionsum: {}/{}".format(fractionsum.numerator/f1gcd, fractionsum.denominator/f1gcd))
    # print('factorsum: ', int(factorsum))
    # print(' ')
    # factorsumtext = "{}/{}".format(sumtop, 2 * A)

    #factordiff = difftop / 2 * A
    fractiondiff = Fraction(diff)
    print("fractiondiff: {}/{}".format(fractiondiff.numerator, fractiondiff.denominator))
    #factordifftext = "{}/{}".format(int(diff), 2 * A)
    f1sign = getsign(sum, True)

    f1 = "({}{})".format(f1sign, int(sum))
    print('f1: ', f1)
    print(' ')

    f2gcd = m.gcd(int(diff), (2 * A))
    print('f2gcd: ', f2gcd)

    f2num = int(diff / f2gcd)
    print('f2num: ', f2num)

    f1num = int((2 * A) / f2gcd)
    print('f1num: ', f1num)

    f2 = "({}x {} {})".format(use_the_1(sum, True), getsign(f2num, False), int(f2num))
    print('f2: ', f2)
    print(' ')

    print('factors: ', f1, f2)
    print(' ')
    print("roots: x = {}/{} or {}/{}".format(str(-f2num), str(f1num)))


    coefficients = getcoefficients()
    print('coefficients: ', coefficients)
    # A = int(coefficients[0])
    # B = int(coefficients[1])
    # C = int(coefficients[2])
    # quadratic(A, B, C)