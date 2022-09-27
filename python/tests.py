def calculate_y_conditional(L, s, a, e, b, c):
    
    y = (a * (0 ** e)) + (b * 0) + c
    print('({},{})'.format(0, y))
    y = (a * (L ** e)) + (b * L) + c
    print('({},{})'.format(L, y))

    # xvals = [0, L]
    # yvals = []
    # #x = 0
    # # for i in range(L, 2):
    # #     xvals.append(x + i)
    # #     i += 1
    # print("")
    # print('xvals: {}'.format(xvals))
    # print("")
    # for x in xvals:
    #     y = (a * (x ** e)) + (b * x) + c
    #     #print('({},{})'.format(x, y))
    #     #print("")

    #     match s:
    #         case '<':
    #             if x < L:
    #                 #x += 1.01 if x < 0 else x
    #                 #print('if x < L:')
    #                 print('({},{})'.format(x, y))
    #                 yvals.append(y)
    #         case '<=':
    #             if x <= L:
    #                 #print('if x <= L:')
    #                 print('({},{})'.format(x, y))
    #                 yvals.append(y)
    #         case '>':
    #             if x > L:
    #                 #print('if x > L:')
    #                 print('({},{})'.format(x, y))
    #                 yvals.append(y)
    #         case '>=':
    #             #if x >= L:
    #                 #print('if x >= L:')
    #                 print('({},{})'.format(x, y))
    #                 yvals.append(y)
    # #print('xvals: {}'.format(xvals))
    # print('yvals: {}'.format(yvals))

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

betweenL = 0
betweenR = 0

print('')
print("first piece")
print('____________________')

calculate_y_conditional(L, s, a, e, b, c)

print('')
print('between piece')
print('____________________')

print('')
print('last piece')
print('____________________')

calculate_y_conditional(L, s2, a2, e2, b2, c2)
print('')
print('')