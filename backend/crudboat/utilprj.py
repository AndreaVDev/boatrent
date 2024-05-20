import locale

def as_money(total):
    locale.setlocale(locale.LC_ALL, 'it_IT.utf8')
    return '€{:,.2f}'.format(total)
   