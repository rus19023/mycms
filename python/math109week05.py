
def calc_compound_interest_total(p, r, n, t):
    p = (1 + (r / n)) ** (n * t)
    return p

def calc_compound_interest_rate(p, r, n, t):
    p = (1 + (r / n)) ** (n * t)
    return p

def main():
    calc_compound_interest_total(6500, 13, 1, 1)