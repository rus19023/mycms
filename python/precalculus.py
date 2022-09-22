from cmath import pi
from contextlib import nullcontext
import math as m
from fractions import Fraction
from matplotlib import pyplot as plt
import numpy as np
#import pylatex as ltx
from inspect import currentframe, getframeinfo

frame = getframeinfo(currentframe())
filename = frame.filename
print('')
print("Filename:", filename)


#plt.rc('text', usetex=True)
plt.rc('font', family='serif')

def main():
    print('')
    print('')
    print('Precalculus Functions Menu')
    print('--------------------------')
    print('1-Factor Trinomial')
    print('2-Solve Quadratic Equation')
    print('3-Get Midpoint of Line')
    print('4-Solve Negative Exponent')
    print('5-Piecewise Graphs')
    print('6-')
    print('')
    choice = int(input('Enter number of function to calculate: '))
    print('')
    match choice:
        case 1:
            coefficients = getcoefficients()
            print(coefficients)
            factortrinomial(coefficients[0], coefficients[1], coefficients[2])
        case 2:
            coefficients = getcoefficients()
            print(coefficients)
            quadratic(coefficients[0], coefficients[1], coefficients[2])
        case 3:
            coords = getpointcoordinates()
            print(coords)
            midpoint_line(coords[0], coords[1], coords[2], coords[3])
        case 4:
            negative_exponent(getnegexpdata())
        case 5:
            pieces = getpieces()
            piecewise_graph(pieces[0],pieces[1],pieces[2],pieces[3],pieces[4], pieces[5], pieces[6])

def getint(message):
    return int(input(message))

def getpieces():
    x = getint('Enter x: ')
    s1 = input('Enter sign 1: ')
    b1 = getint('Enter b1 value: ')
    c1 = getint('Enter c1 value: ')
    s2 = input('Enter sign 2: ')
    b2 = getint('Enter b2 value: ')
    c2 = getint('Enter c2 value: ')
    return x, s1, b1, c1, s2, b2, c2

def getpointcoordinates():
    print('(include the - sign for negative numbers)')
    x1 = int(input('enter coefficient x\u2081: '))
    x2 = int(input('enter coefficient x\u2082: '))
    y1 = int(input('enter coefficient y\u2081: '))
    y2 = int(input('enter coefficient y\u2082: '))
    return x1, x2, y1, y2

def getcoefficients():
    print('(include the - sign for negative numbers)')
    a = getint('Enter coefficient A: ')
    b = getint('Enter coefficient B:  ')
    c = getint('Enter coefficient C: ')
    print('a: {}, b: {}, c: {}'.format(a, b, c))
    return a, b, c

def getnegexpdata():
    print('(include the - sign for negative numbers, including the exponent)')
    n = getint('Enter numerator: ')
    d = getint('Enter denominator: ')
    e = getint('Enter exponent : ')
    if e >= 0:
        print('Exponent must be negative')
        e = getint('Enter exponent : ')
    return n, d, e

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


def factortrinomial(a, b, c):
    print('factor trinomial: {}x\u00b2 + {}x + {}'.format(a, b, c))
    print('a: {}'.format(a))
    print('b: {}'.format(b))
    print('c: {}'.format(c))
    # get the product of a and c coefficients to set range for loop
    ac = a * c
    if ac < 0:
        acstart = -ac
        print('     ac: {}, Line Number: ()'.format(ac, frame.lineno))
    else:
        acstart = ac
        print('     ac: {}, Line Number: ()'.format(ac, frame.lineno))
    # find factors of ac that = b when added together
    # using numbers less than ac
    #print('ac + 1: {}'.format(ac + 1))
    for i in range(acstart, ac):
        # check for divisor not 0 and i is a factor of ac
        if i != 0 and ac % i == 0:
            f1 = ac / i
            f2 = i
            print('f1, f2: {}, {}'.format(f1, f2))
            print('line 84, i: {}'.format(i))
            print('line 87, i: {}'.format(i))
            if (ac / i) + i == b:
                print('line 89, i: {}'.format(i))
                fractionf1 = Fraction(i)
                fractionf2 = Fraction(ac / i)
                print('factors = ({}x + {}), ({}x + {})'.format(fractionf1.denominator, fractionf1.numerator, fractionf2.denominator, fractionf2.numerator))
                print('line 91, i: {}'.format(i))
            i += 1
            print('line 93, i: {}'.format(i))

def quadratic(A, B, C):
    print('quadratic equation: \n')
    #getcoefficients()
    print('quadratic equation: y = {}x\u00b2 + {}x + {}'.format(A, B, C))
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
    print("solve: x = {}/{} or ".format(str(-f2num), str(f1num)))

def complete_square(A, B):
    print(' ')
    getcoefficients()
    C = 1 / 2 * B
    C = C * C
    print(' ')
    print("Complete square:  = {}".format(C))
    print('')

def calculate_y(x, L, s, a, e, b, c):
    xpoints = [-2, -1, 0, 1, 2]

    match s:
        case '<':
            y = a1 * (x ** e) + (b1 * x) + c1
        case '<=':
            ypoints.append(x[i] <= b1 * x + c1
        case '>':
            y = x > b1 * x + c1
        case '>=':
            y = x >= b1 * x + c1
    print('({},{}'.format(x, y))

calculate_y(0, 2, <=, 0, 0, -5, 3)
calculate_y(1, 2, <=, 0, 0, -5, 3)
calculate_y(-1, 2, <=, 0, 0, -5, 3)
calculate_y(2, 2, <=, 0, 0, -5, 3)
calculate_y(-2, 2, <=, 0, 0, -5, 3)


def piecewise_graph(x, s1, b1, c1, s2, b2, c2):
    # f1 = "{} {}".format(x, s1)
    # f2 = "{} {}".format(x, s2)
    # print("f1: {} {}".format(x, s1))
    # print("f1: {} {}".format(x, s2))

    # x axis values
    xpoints = [x, x - 2]
    ypoints = []
    # corresponding y axis values
    match s1:
        case '<':
            ypoints.append(x < b1 * x + c1)
        case '<=':
            ypoints.append(x <= b1 * x + c1
        case '>':
            y = x > b1 * x + c1
        case '>=':
            y = x >= b1 * x + c1
    match s2:
        case '<':
            y += x < b2 * x + c2
        case '<=':
            y += x <= b2 * x + c2
        case '>':
            y += x > b2 * x + c2
        case '>=':
            y += x >= b2 * x + c2


    # plotting the points
    plt.plot(x, y, color='red')
    plt.grid()

    # naming the x axis
    plt.xlabel('x - axis')
    # naming the y axis
    plt.ylabel('y - axis')

    # giving a title to my graph
    plt.title('Piecewise graph for f(x) f1 and f(x) f2!')

    # function to show the plot
    plt.show()


# #complete_square(A, B)

def midpoint_line(x1, x2, y1, y2):
    print('Midpoint of a line:')
    print('')
    print("line defined as: \nstart: ({},{}), end: ({},{})".format(x1, x2, y1, y2))
    print(' ')
    x = int((x1 + x2)/2)
    y = int((y1 + y2)/2)
    #print("x coord: x\u2081 + x\u2082 / 2 = {}".format(x))
    print("x coord: {} + {} / 2 = {}".format(x, x1, x2, x))
    print(' ')
    print("y coord: y\u2081 + y\u2082 / 2 = {}".format(y))
    print("y coord: {} + {} / 2 = {}".format(y1, y2, y))
    print(' ')
    print("Midpoint: ({},{})".format(x, y))

#def circumference():

def negative_exponent(a, b, exp):
    exp2 = -exp  #calculate superscript of exponent value
    print("Negative exponent of ({}/{})^{}  =  {}/{}".format(b, a, exp, b ** exp2, a ** exp2))

# \u2081 = subscript x

main()

print('-------------------------- ')
print('')
# print('-------------------------- ')
# print('')

# print('')
# print('-------------------------- ')
# print('')


# print(' ')
# print('-------------------------- ')
# print(' ')


# print(' ')
# print('-------------------------- ')
# print(' ')


# print(' ')
# print('-------------------------- ')
# print(' ')


# print(' ')
# print('-------------------------- ')
# print(' ')


# print(' ')
# print('-------------------------- ')
# print(' ')


# print(' ')
# print('-------------------------- ')
# print(' ')


# print(' ')
# print('-------------------------- ')
# print(' ')


# print(' ')
# print('-------------------------- ')
# print(' ')

# print(' ')
# print('-------------------------- ')
# print(' ')