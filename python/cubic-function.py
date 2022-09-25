import matplotlib.pyplot as plt
import numpy as np

def calc_cubic(a, b, c, d, z):
    ypoints = []
    function = '{}(x-3)\u00B3 + {}x\u00B2 + {}x + {}'.format(a, b, c, d)
    xpoints = [-7, -5, -2, -1, 0, 1, 2, 3, 4, 5, 8]
    for x in xpoints:
        inside = x - z
        cubed = inside ** 3
        ax = a * cubed
        squared = (x ** 2)
        bx = b * squared
        cx = c * x

        print('({}({} + {})\u00B3 + ({} * ({}\u00B2)) + ({} * {}) + {} = {}'.format(a, x, z, b, x, c, x, d, (a * ((x - z) ** 3)) + (b * (x ** 2))  + (c * x) + d))
        print('')
        y1 = ax + bx + cx + d
        y = (a * ((x - z) ** 3)) + (b * (x ** 2))  + (c * x) + d
        #print('y: ({},{}) or y1: ({},{}) '.format(x, y, x, y1))
        ypoints.append(y)
    print('')
    print('')
    print('xpoints: {}'.format(xpoints))
    print('')
    print('ypoints: {}'.format(ypoints))
    print('')
    print('function: {}'.format(function))
    print('')
    print('');
    return xpoints, ypoints, function


cubic_graph = calc_cubic(-2, 0, 0, -5, -3)

# cubic_graph values
xpoints1 = cubic_graph[0]
ypoints1 = cubic_graph[1]
cubic_function = cubic_graph[2]


# plotting cubic_graph
plt.plot(xpoints1, ypoints1, color='red')

plt.grid()
#plt.x = np.arange(0, 300, 20)
#plt.y = np.arange(0, 300, 20)

# naming the x axis
plt.xlabel('x - axis')
# naming the y axis
plt.ylabel('y - axis')

# giving a title to my graph
plt.title('Graph for cubic function {}'.format(cubic_function))

# function to show the plot
#plt.show()