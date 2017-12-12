# Pyro-Web 
A front-end UI for the Pyro FHIR Server project

## Features

* Pyro FHIR Server conformance statment display

## Visual Studio Code

* Development performed in VS Code

### Required Extensions

* [**vscode-chrome-debug**](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* [**vscode-eslint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


## Dev Installation

1.   `git clone https://angusmillar@bitbucket.org/angusmillar/pyro-web.git`
2.   open pyro-web in Visual Studio Code
3.   make sure you have [vscode-chrome-debug](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension installed
4.   press <kbd>F1</kbd> > `Run Task` > `install` (or `npm install`) to install all dependencies


## Visual Studio Code shortcuts

*   <kbd>F5</kbd> to start debugging
*   <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>B</kbd> to build a production release
*   <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>T</kbd> to run eslint

## Website installation / depolyment 
First build the production website files by running the VS Code task named release. Then take all the files output to the dist folder of the project. Take these files to the web server e.g IIS8

### Windows Server IIS8
1.   Create a new windows account on the server for the new website application pool to use. Add this account to the IIS_IUSRS acount group.
2.   Create a new folder under the IIS directory C:\inetpub\wwwroot\[MyNewWebsite]
3.   Assign access to this new folder to the new windows acount you created
4.   Open IIS Manager and create a new Aplication pool, set .NET CLR version to be No Managed Code and Mananged pipline mode to intergrated and tick start application pool immediately
5.   Now add a new wesite under sites, select the application pool you just created. Set the Physical path to the folder you put the website content in. Click Connect As and enter the windows account name you created and it's password. Enter you domian/subdomain in Host Name, Click OK.
6.   Ensure your Bindings are correct http or https and cetrificates if required.
7.   Hit restat just to ensure everything it set and navigate to your site to test.