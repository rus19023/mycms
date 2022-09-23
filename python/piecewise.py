from matplotlib import pyplot as plt

def calculate_y_piece(L, s, a, e, b, c):
    xvals = []
    xvals.append(L)
    if s == '>' or s == '>=':
        if 0 > L:
            xvals.append(0)
        else:
            xvals.append(L + 1)
    if s == '<' or s == '<=':
        if 0 < L:
            xvals.append(0)
        else:
            xvals.append(L - 1)
    print("")
    yvals = []
    points = ''
    for x in xvals:
        y = (a * (x ** e)) + (b * x) + c
        yvals.append(y)
        points += '({},{}) '.format(x, y)
    print('*** points: {} ***'.format(points))
    print("")
    print('    xvals: {}'.format(xvals))
    print('    yvals: {}'.format(yvals))
    return xvals, yvals


def piecewise_graph(graph1, graph2):

    # graph1 values
    xpoints1 = graph1[0]
    ypoints1 = graph1[1]

    # graph2 values
    xpoints2 = graph2[0]
    ypoints2 = graph2[1]


    # plotting graph1
    plt.plot(xpoints1, ypoints1, color='red')

    # plotting graph2
    plt.plot(xpoints2, ypoints2, color='blue')

    plt.grid()

    # naming the x axis
    plt.xlabel('x - axis')
    # naming the y axis
    plt.ylabel('y - axis')

    # giving a title to my graph
    plt.title('Piecewise graph for f(x)  and f(x) f2')

    # function to show the plot
    plt.show()

def header(L, s, b, c):
    sb = '-' if b < 0 else ''
    sc = '+' if c > 0 else '-'
    sb += str(abs(int(b))) if abs(b) != 1 else ''
    sc += ' {}'.format(str(abs(int(c))))
    print("")
    print('{}x {}  if x {} {} '.format(sb, sc, s, L))

L = -1
s = '<'
b = -1
c = 3

s2 = '>='
b2 = -3
c2 = 1

a = 0
e = 1
a2 = 0
e2 = 1

between = False
betweenL = 0
betweenR = 0

print('')
print('_________________________')
print('For piecewise equations: ')
print('')
print('_________________________')
print('')
print("first piece")
header(L, s, b, c)
print('_________________________')

piece1 = calculate_y_piece(L, s, a, e, b, c)

if between:
    print('')
    print('between piece')
    print('_________________________')

print('_________________________')
print('')
print('last piece')
header(L, s2, b2, c2)
print('_________________________')

piece2 = calculate_y_piece(L, s2, a2, e2, b2, c2)
print('')
print('piece1 coordinates (x,y):\n {}'.format(piece1))
print('')
print('piece2 coordinates (x,y):\n {}'.format(piece2))
print('')
print('_________________________')
print('')
print('')

#piecewise_graph(piece1, piece2)