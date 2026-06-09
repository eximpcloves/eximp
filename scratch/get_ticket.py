import sys
import os

sys.path.append('..\\pos-eximp-cloves')
pos_venv = '..\\pos-eximp-cloves\\pos-eximp\\Lib\\site-packages'
sys.path.append(pos_venv)

# Mock env vars if needed
os.environ['SUPABASE_URL'] = 'https://scsdnstqtrqjsosbmxyf.supabase.co'
# I need the real supabase key. But maybe I don't need Supabase if I can just look at the app.
