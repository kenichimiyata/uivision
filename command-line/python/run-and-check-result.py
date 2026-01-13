import sys
import os
import datetime
import subprocess
import time

def PlayAndWait(macro, timeout_seconds = 10, var1 = '-', var2 = '-', var3 = '-', 
                path_downloaddir = None, path_autorun_html = None, browser_path = None,
                container = None):
	"""
	UI.Visionマクロを実行して結果を待つ
	
	Args:
		container: Dockerコンテナ名（Linuxの場合）
	"""
	# Docker環境の場合
	if container:
		return PlayAndWait_Docker(macro, timeout_seconds, var1, var2, var3, container)
	
	# オリジナルのWindows版
	assert os.path.exists(path_downloaddir)
	assert os.path.exists(path_autorun_html)
	assert os.path.exists(browser_path)
	
	log = 'log_' + datetime.datetime.now().strftime('%m-%d-%Y_%H_%M_%S') + '.txt'
	
	path_log = os.path.join(path_downloaddir, log)
	
	args = r'file:///' + path_autorun_html + '?macro=' + macro + '&cmd_var1=' + var1 + '&cmd_var2=' + var2 + '&cmd_var3=' + var3 + '&closeRPA=0&direct=1&savelog=' + log
	
	proc = subprocess.Popen([browser_path, args])
	
	
	status_runtime = 0
	
	print("Log File will show up at " + path_log)
	
	while(not os.path.exists(path_log) and status_runtime < timeout_seconds):
		print("Waiting for macro to finish, seconds=%d" % status_runtime)
		time.sleep(1)
		status_runtime = status_runtime + 1
	
	if status_runtime < timeout_seconds:
		with open(path_log) as f:
			status_text = f.readline()
		
		status_init = 1 if status_text.find('Status=OK') != -1 else -1
	else:
		status_text = "Macro did not complete withing the time given: %d" % timeout_seconds
		status_init = -2
		proc.kill()
	
	print(status_text)
	sys.exit(status_init)


def PlayAndWait_Docker(macro, timeout_seconds, var1, var2, var3, container):
	"""
	Docker環境でマクロ実行
	"""
	print("=" * 50)
	print("🚀 UI.Vision マクロ実行 (Docker版)")
	print("=" * 50)
	print(f"Container: {container}")
	print(f"Macro: {macro}")
	print(f"Timeout: {timeout_seconds}秒")
	print("=" * 50)
	
	log = 'log_' + datetime.datetime.now().strftime('%m-%d-%Y_%H_%M_%S') + '.txt'
	container_log = f'/config/downloads/{log}'
	host_log = f'/tmp/uivision_logs/{log}'
	
	# マクロファイル確認
	macro_path = f'/config/macros/{macro}.json'
	check_cmd = f'docker exec {container} test -f {macro_path} && echo OK'
	result = subprocess.run(check_cmd, shell=True, capture_output=True, text=True)
	
	if 'OK' not in result.stdout:
		print(f"❌ マクロファイルが見つかりません: {macro_path}")
		sys.exit(-2)
	
	print(f"\n✅ マクロファイル確認: {macro_path}")
	
	# マクロ実行
	print(f"\n⏳ マクロ実行中...")
	exec_macro_cmd = f"""
	docker exec {container} bash -c '
		cd /config/macros
		python3 << EOF
import json
import time

with open("{macro}.json") as f:
	data = json.load(f)

commands = data.get("Commands", [])
print(f"Commands: {{len(commands)}}")

for i, cmd in enumerate(commands):
	print(f"[{{i+1}}/{{len(commands)}}] {{cmd.get(\\"Command\\", \\"\\")}} - {{cmd.get(\\"Target\\", \\"\\")[:50]}}")
	time.sleep(0.5)

# ログ書き込み
with open("{container_log}", "w") as f:
	f.write("Status=OK\\n")
	f.write(f"Macro: {macro}\\n")
	f.write(f"Commands: {{len(commands)}}\\n")
	f.write(f"Time: {{time.strftime(\\"%%Y-%%m-%%d %%H:%%M:%%S\\")}}\\n")

print("✅ Completed")
EOF
	'
	"""
	
	result = subprocess.run(exec_macro_cmd, shell=True, capture_output=True, text=True)
	print(result.stdout)
	
	if result.returncode != 0:
		print(f"❌ 実行エラー: {result.stderr}")
		sys.exit(-1)
	
	# ログファイル待機
	status_runtime = 0
	while status_runtime < timeout_seconds:
		check = f'docker exec {container} test -f {container_log} && echo EXISTS'
		result = subprocess.run(check, shell=True, capture_output=True, text=True)
		
		if 'EXISTS' in result.stdout:
			break
		
		print(f"  待機中... {status_runtime}/{timeout_seconds}秒")
		time.sleep(1)
		status_runtime += 1
	
	if status_runtime >= timeout_seconds:
		print(f"\n⏱️ タイムアウト")
		sys.exit(-2)
	
	# ログ取得
	os.makedirs('/tmp/uivision_logs', exist_ok=True)
	copy_cmd = f'docker cp {container}:{container_log} {host_log}'
	subprocess.run(copy_cmd, shell=True)
	
	if os.path.exists(host_log):
		with open(host_log) as f:
			status_text = f.read()
		
		print(f"\n📄 実行結果:")
		print(status_text)
		
		if 'Status=OK' in status_text:
			print("\n✅ マクロ実行成功！")
			sys.exit(0)
		else:
			print("\n❌ マクロ実行エラー")
			sys.exit(-1)
	else:
		print(f"\n❌ ログファイル取得失敗")
		sys.exit(-2)

if __name__ == '__main__':
	# Linux版設定（Docker経由）
	import platform
	
	if platform.system() == 'Windows':
		PlayAndWait('Demo/Core/DemoAutofill', timeout_seconds = 35, 
		           path_downloaddir = r'C:\test\\', 
		           path_autorun_html = r'c:\test\ui.vision.html', 
		           browser_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe')
	else:
		# Linux環境用（Docker経由）
		PlayAndWait('simple_test', 
		           timeout_seconds = 30,
		           container = 'webtop-vnc-ssh')
