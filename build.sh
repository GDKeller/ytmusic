nativefier --name "YouTube Music" -f -u "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136" --single-instance "https://music.youtube.com/" ./build --internal-urls ".*?\.google\.*?" --inject ./css/style.css --inject .\extensions\adblock-youtube\5.0.9_0\scripts\contentscript.js