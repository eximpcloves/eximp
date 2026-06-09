import os

def get_large_files(root_dir, top_n=20):
    files_with_size = []
    
    # Directories to completely skip traversing
    skip_dirs = {'.git', 'node_modules', 'pos-eximp', '__pycache__', 'dist', '.venv'}
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Modify dirnames in-place to skip traversing ignored directories
        dirnames[:] = [d for d in dirnames if d not in skip_dirs]
        
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            try:
                # Get file size in MB
                size_mb = os.path.getsize(filepath) / (1024 * 1024)
                files_with_size.append((filepath, size_mb))
            except OSError:
                pass
                
    # Sort by size descending
    files_with_size.sort(key=lambda x: x[1], reverse=True)
    
    for filepath, size in files_with_size[:top_n]:
        print(f"{size:.2f} MB - {filepath}")

if __name__ == '__main__':
    get_large_files('..\\pos-eximp-cloves')
