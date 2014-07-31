Classes = [
	{
	   "name" : "USBController",
	   "functions": [
			{
				"name":"create_task","code":"#network scanner\ninfo = {'scan_name':  \"network scanner test\", \n        'hostname': \"192.168.50.100\", \n        'username': \"test\", \n        'password': \"secret\"}\ncreate_new_task(\"network_scanner\", info)\n\n#email scanner\ninfo = {'scan_name': \"Email scanner test\", \n        'hostname': ['example@abc.com', 'example2@abc.com']}\ncreate_new_task(\"email_scanner\", info)","signature":"create_task(self, type, info)","description":"To receive command from user and create a new task with <tt>init</tt> status in database.json file. <b>type</b>: Type scan. There are four type scan: <tt>email_scanner</tt>, <tt>ad_scanner</tt>, <tt>network_scanner</tt>, <tt>direc_scanner</tt>.<b>info</b>: Information target"
			},
			{
				"name":"update_task","code":"info = {\"status\": \"init\", \n        \"scantype\": \"network_scanner\",\n        \"target\": \"192.168.50.100\", \n        \"name\": \"network scanner test\", \n        \"time\": \"1406091440\"}\nupdate_task(info)\n\n#email scanner\ninfo = {'scan_name': \"Email scanner test\", \n        'hostname': ['example@abc.com', 'example2@abc.com']}\ncreate_new_task(\"email_scanner\", info)","signature":"update_task(self, info)","description":"Add a new task with <tt>init</tt> to database.json. <b>info</b> is dictionary contain infomation new task: <tt>name</tt>, <tt>status</tt>, <tt>target</tt>, <tt>time</tt> and <tt>scantype</tt>"
			},
			{
				"name":"delete_task","code":"delete_task(self, \"1406091440\")","signature":"delete_task(self, scan_id)","description":"Delete task. <b>scan_id</b> is timestamp task created."
			}
	   ]
	},
	{
	   "name" : "USBObsever",
	   "functions": [
			{
				"name":"observe","code":"USBObserver().observe()","signature":"observe(self)","description":"main function to call manage_task()"
			},
			{
				"name":"manage_task","code":"manage_task()","signature":"manage_task(self)","description":"manage all task in database.json. if status is <tt>init</tt> , program will create a new thread and create new object USBRunner(), if status task is <tt>processing</tt>, it will create a new object USBRunner() in first time run."
			},
			{
				"name":"create_task","code":"info = {\n    \"status\": \"init\",\n    \"scantype\": \"network_scanner\",\n    \"target\": \"192.168.50.100\",\n    \"name\": \"network scanner test\",\n    \"time\": \"1406108539\"}\ncreate_task(info)\n=> create a new USBRunner object scan 192.168.50.100","signature":"create_task(self, info)","description":"Create a new USBRunner object with <b>info</b> is information of task"
			}
	   ]
	},
	{
	   "name" : "USBRunner",
	   "functions": [
			{
				"name":"update_task","code":"info = {\n    \"status\": \"init\",\n    \"scantype\": \"network_scanner\",\n    \"target\": \"192.168.50.100\",\n    \"name\": \"network scanner test\",\n    \"time\": \"1406108539\"}\nupdate_task(info, \"processing\")\n=> Update status task info to processing","signature":"update_task(self, task_info, new_status)","description":"Update status <b>task_info</b> with <b>new_status</b> status"
			},
			{
				"name":"scan","code":"info = {\n    \"status\": \"init\",\n    \"scantype\": \"network_scanner\",\n    \"target\": \"192.168.50.100\",\n    \"name\": \"network scanner test\",\n    \"time\": \"1406108539\"}\nscan(info)\n=> Call NetworkScanner object and excute task\n\ninfo = {\n    \"status\": \"init\",\n    \"scantype\": \"email_scanner\",\n    \"target\": \"example@abc.com\",\n    \"name\": \"email scanner test\",\n    \"time\": \"1406108539\"}\nscan(info)\n=> Call SendEmail object and send email to example@abc.com with file attachment","signature":"scan(self, info):","description":"Call new object excute task. Object can is NetworkScanner or SendEmail. when finish task, it will call <tt>update_task() </tt> function and update status task to <tt>done</tt>. <b>info</b> is information of task"
			}
	   ]
   },
   {
	   "name" : "NetworkScanner",
	   "functions": [
			{
				"name":"load_config","code":"load_config()\n=> Get all information for connect remote wmi to target","signature":"load_config(self)","description":"Get information target <tt>domain</tt>, <tt>ip</tt>, <tt>username</tt>, <tt>password</tt> from file config"
			},
			 {
				"name":"scan_remote","code":"scan_remote()\n=> Connect remote wmi to target and scan remote.","signature":"scan_remote(self, type_scan=None):","description":"Connect remote wmi to target, after copy folder excute file to remote computer and run remote usb_canner.exe, <b>type_scan</b> is type scan target, defaule value of it is <tt>None</tt> Function return <tt>True</tt> is connect and excute file remote successfull and return <tt>False</tt> if connect wmi false"
			}
	   ]
   },
   {
	   "name" : "NetworkConnector",
	   "functions": [
			{
				"name":"connect_remote","code":"","signature":"connect_remote(self)","description":"Connect remote wmi to target. Function return <tt>True</tt> if connect successfull and return <tt>False</tt> if connect false"
			},
			{
				"name":"run_remote","code":"run_remote(self, \"C:\\ProgramData\\Scanner\\usb_scanner.exe\")\n=> Excute remote file usb_scanner.exe","signature":"run_remote(self, path_file)","description":"Excute remote file in remote computer with filename is full path of file usb_scanner.exe"
			}, 
			{
				"name":"upload_folder","code":"upload_folder(\"C:\\\\Test\\\\\", \"C:\\\\ProgramData\\\\Scanner\\\\\")\n=> Copy all file from folder C:\\Test to C:\\ProgramData\\Scanner\\ folder in remote computer","signature":"upload_folder(self, src_folder, dest_folder)","description":"Copy all file from <b>src_folder</b> in local machine to <b>dest_folder</b> in remote computer."
			},
			{
				"name":"net_copy","code":"net_copy(\"test_file.txt\", \"C:\\\\ProgramData\\\\Scanner\\\\\")\n=> Copy file test_file.txt from folder C:\\Test to C:\\ProgramData\\Scanner\\ folder in remote computer","signature":"net_copy(self, source, dest_dir, move=False)","description":"Copies files or directories to a remote computer"
			}
	   ]
   },
   {
	   "name" : "EmailScanner",
	   "functions": [
			 {
				"name":"connect_to_mail_server","code":"connect_to_mail_server()\n=> return True if connnect to smtp successfull and False if connect false","signature":"connect_to_mail_server(self)","description":"Connect to SMTP server using parameters in file <tt>settings.py</tt>."
			}, 
			{
				"name":"send_email","code":"send_email( \"example@abc.com\")\n=> send email to example@abc.com","signature":"send_email(self, email_recv)","description":"send email to email_recv. Content and file attachment directory is configured in <tt>settings.py</tt>"
			},
			{
				"name":"check_valid_email","code":"check_valid_email( \"example@abc.com\")\n=> return True\ncheck_valid_email( \"example@ab\")\n=> return False","signature":"check_valid_email(self, email)","description":"Check format email using regular expression string"
			}
	   ]
   },
   {
	   "name" : "RegistryManager",
	   "functions": [
			{
				"name":"get_subkeys","code":"get_subkeys(\"SYSTEM\\CurrentControlSet\\Enum\\USB\\\\\")\n=> return\n{'VID_0FCE&PID_019E': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\VID_0FCE&PID_019E\\\\',\n 'VID_03F0&PID_0024': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\VID_03F0&PID_0024\\\\',\n 'Vid_0E0F&Pid_0001': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\Vid_0E0F&Pid_0001\\\\',\n 'ROOT_HUB20': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\ROOT_HUB20\\\\',\n 'VID_0718&PID_061A': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\VID_0718&PID_061A\\\\',\n 'VID_4971&PID_1020': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\VID_4971&PID_1020\\\\',\n 'ROOT_HUB': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\ROOT_HUB\\\\',\n 'VID_1516&PID_1226': 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USB\\\\VID_1516&PID_1226\\\\'\n}","signature":"get_subkeys(self, registry_path)","description":"Get all subkey in <b>registry_path</b>. Function return a dictionary of <tt>subkey name</tt> and <tt>path of subkey</tt>"
			}, 
			{"name":"get_time_info","code":"get_time_info(\"SYSTEM\\CurrentControlSet\\Enum\\USB\\\\\")\n=> 130499872377500000","signature":"get_time_info(self, registry_path)","description":"Get time create <b>registry_path</b>. Function return an integer giving when the key was last modified (if available) as 100's of nanoseconds since Jan 1, 1600."},
			{"name":"convert_time","code":"convert_time(130499872377500000)\n=> 2014/07/16 19:27","signature":"convert_time(self, offset_time)","description":"Convert time information subkey to timestamp"}
	   ]
   },
   {
	   "name" : "DeviceInformation",
	   "functions": [
			{"name":"get_serial_number","code":"description = 0703C2060AA67A55&0\nserial_number = get_serial_number()\n=> serial_number = 0703C2060AA67A55","signature":"get_serial_number(self)","description":"Get USB serial number from subkey name in <tt>USBSTOR</tt>"},
			{"name":"get_friendly_name","code":"","signature":"get_friendly_name(self)","description":"Get value key \"FriendlyName\" of USB subkey. It show USB information"},
			{"name":"get_first_access_time","code":"","signature":"get_first_access_time(self)","description":"Get USB first time acces. It read information in key <tt>Device Parameters\\\\Partmgr\\\\</tt> of USB subkey or find time in \"C:\\Windows\\setupapi.log\" file with window XP or 'C:\\Windows\\inf\\setupapi.dev.log' file with Window 7"},
			{"name":"get_last_access_time","code":"","signature":"get_last_access_time(self)","description":"Get USB last time acces. It read information in all subkeys which name's contain USB serial number and get last time"}, 
			
			
	   ]
   },
   {
	   "name" : "USBScanner",
	   "functions": [
			{"name":"post_data","code":"","signature":"get_list_usb(self)","description":"Get list all subkeys in subkey of <tt>SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\</tt>. Function return a dictionary subkeys and their path"},
			{"name":"get_usb_device_class","code":"","signature":"get_usb_device_class(self)","description":"Get all subkeys in USB device class contain serial number of USB"},
			{"name":"scan","code":"","signature":"scan(self)","description":"Get all information of usb. Function return a array DeviceInformation object."},
			{"name":"create_report","code":"","signature":"create_report(self, info)","description":"Create file report json contain all USB information . File report.json is saved in C:/ProgramData/Scanner/Report/. <b>info</b> is array DeviceInformation object"},
			{"name":"load_config","code":"File config.json: {\"postURL\": \"http://192.168.50.100/usb/\"}\nload_config(self)\n=> return \"http://192.168.50.100/usb/\"","signature":"load_config(self)","description":"Get url API server in file config."},
			{"name":"run","code":"USBScanner().run()\n=> run program scan usb history and send report","signature":"run(self)","description":"Main function excute scan and create, send report"}
	   ]
   },
   {
	   "name" : "HTTPConnector",
	   "functions": [
			{"name":"post_data","code":"data = [\n {'Serial number':'6&5b1b7f2&0', 'Friendly Name': u'USB Device'},\n {'Serial number': '0703C2060', 'Friendly Name': 'Storage USB Device'}\n ]\nurl = \"http://192.168.50.100/usb/\"\npost_data(self, url, data)\n=> send data to address \"http://192.168.50.100/usb/\"","signature":"post_data(self, url, data)","description":"Send POST <b>data</b> to <b>url</b>. <b>data</b> is array dictionary json is sended to <b>url</b>"}
	   ]
   }
];