import turtle
from turtle import Turtle, Screen
import random

tim = Turtle()
tim.shape("arrow")


tim.pencolor("#228B22")
screen = Screen()
screen.bgcolor("black")

delay = turtle.delay(100)
speed = tim.speed("fastest")


#
# for _ in range(4):
#     tim.forward(100)
#     tim.left(90)


#
# timmy_the_turtle.forward(100)
# timmy_the_turtle.right(90)
# timmy_the_turtle.forward(100)
# timmy_the_turtle.left(90)
# timmy_the_turtle.back(100)
# timmy_the_turtle.left(90)
# timmy_the_turtle.forward(100)

#
# for _ in range(15):
#     tim.forward(10)
#     tim.penup()
#     tim.forward(10)
#     tim.pendown()


direction = [0, 90, 180, 270]
turtle.colormode(255)

def random_colour():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    tim.color(r, g, b)
    return True


def draw_spirograph(size_of_gap):
    for _ in range(int(360 / size_of_gap)):
        random_colour()
        tim.circle(100)
        tim.setheading(tim.heading() + size_of_gap)


draw_spirograph(5)

# def form_shapes(num_of_sides):
#     angle = 360 / num_of_sides
#     for _ in range(num_of_sides):
#         global delay
#         tim.forward(100)
#         tim.right(angle)
#
#
# for shape_side_n in range(2, 11):
#     tim.color(random.choice(colours))
#     form_shapes(shape_side_n)
#


screen = Screen()
screen.exitonclick()