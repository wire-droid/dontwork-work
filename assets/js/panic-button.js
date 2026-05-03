/**
 * PANIC BUTTON - Core Feature
 * Displays full-screen fake work screens when boss walks by
 * Keyboard shortcut: Ctrl+Shift+X
 * ESC or double-click to exit
 */

class PanicButton {
  constructor() {
    this.screens = ['bsod', 'mac-panic', 'excel', 'gmail', 'vscode', 'terminal'];
    this.currentScreen = null;
    this.isActive = false;
    this.init();
  }

  init() {
    // Create panic button (always visible)
    this.createButton();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+X to activate
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        this.activate();
      }
      
      // ESC to deactivate
      if (e.key === 'Escape' && this.isActive) {
        this.deactivate();
      }
    });
  }

  createButton() {
    const btn = document.createElement('button');
    btn.id = 'panic-btn';
    btn.innerHTML = '🚨 PANIC';
    btn.setAttribute('aria-label', 'Panic button - Shows fake work screen');
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999998;
      padding: 12px 24px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      transition: transform 0.2s, box-shadow 0.2s;
    `;
    
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    });
    
    btn.addEventListener('click', () => this.activate());
    
    document.body.appendChild(btn);
  }

  activate() {
    if (this.isActive) return;
    
    this.isActive = true;
    
    // Get preferred screen type from localStorage, or random
    const preferredScreen = localStorage.getItem('panicScreenType');
    const screen = (preferredScreen && preferredScreen !== 'random') 
      ? preferredScreen 
      : this.screens[Math.floor(Math.random() * this.screens.length)];
    
    // Create fullscreen overlay
    this.currentScreen = document.createElement('div');
    this.currentScreen.id = 'panic-screen';
    this.currentScreen.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999999;
      background: black;
      cursor: pointer;
    `;
    
    this.currentScreen.innerHTML = this.getScreenHTML(screen);
    document.body.appendChild(this.currentScreen);
    
    // Exit handlers
    let clickCount = 0;
    let clickTimeout;
    
    this.currentScreen.addEventListener('click', () => {
      clickCount++;
      
      if (clickCount === 2) {
        this.deactivate();
        clickCount = 0;
        clearTimeout(clickTimeout);
      } else {
        clickTimeout = setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    });
  }

  deactivate() {
    if (!this.isActive) return;
    
    if (this.currentScreen) {
      this.currentScreen.remove();
      this.currentScreen = null;
    }
    
    this.isActive = false;
  }

  getScreenHTML(type) {
    switch(type) {
      case 'bsod':
        return this.getBSOD();
      case 'mac-panic':
        return this.getMacPanic();
      case 'excel':
        return this.getExcel();
      case 'gmail':
        return this.getGmail();
      case 'vscode':
        return this.getVSCode();
      case 'terminal':
        return this.getTerminal();
      default:
        return this.getBSOD();
    }
  }

  getBSOD() {
    return `
      <div style="background:#0178d4;color:white;padding:100px 80px;font-family:'Segoe UI',sans-serif;height:100vh;overflow:hidden;">
        <div style="font-size:150px;margin-bottom:20px;">:(</div>
        <div style="font-size:32px;margin-bottom:40px;line-height:1.4;">
          Your PC ran into a problem and needs to restart.<br>
          We're just collecting some error info, and then we'll restart for you.
        </div>
        <div style="font-size:24px;margin-bottom:40px;">0% complete</div>
        <div style="font-size:18px;opacity:0.8;line-height:1.6;">
          For more information about this issue and possible fixes, visit<br>
          https://www.windows.com/stopcode<br><br>
          If you call a support person, give them this info:<br>
          <span style="margin-top:20px;display:inline-block;">Stop code: DEFINITELY_NOT_SLACKING_AT_WORK</span>
        </div>
        <div style="position:absolute;bottom:40px;left:80px;font-size:14px;opacity:0.6;">
          <div style="margin-bottom:10px;">Press ESC or double-click to exit</div>
        </div>
      </div>
    `;
  }

  getMacPanic() {
    return `
      <div style="background:#333;color:#ddd;padding:100px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;">
        <div style="text-align:center;max-width:600px;margin:0 auto;">
          <div style="font-size:48px;margin-bottom:40px;">⚠️</div>
          <div style="font-size:20px;line-height:1.8;margin-bottom:60px;">
            You need to restart your computer. Hold down the Power button<br>
            until it turns off, then press the Power button again.
          </div>
          <div style="font-size:16px;opacity:0.7;margin-bottom:20px;">
            Vous devez redémarrer votre ordinateur. Maintenez le bouton<br>
            Marche/Arrêt enfoncé jusqu'à ce qu'il s'éteigne, puis appuyez de nouveau dessus.
          </div>
          <div style="font-size:16px;opacity:0.7;margin-bottom:20px;">
            Sie müssen den Computer neu starten. Halten Sie den Ein-/Ausschalter<br>
            gedrückt, bis das Gerät ausgeschaltet wird. Drücken Sie danach erneut darauf.
          </div>
          <div style="font-size:16px;opacity:0.7;">
            コンピュータを再起動する必要があります。<br>
            電源が切れるまで電源ボタンを押し続け、もう一度押してください。
          </div>
        </div>
        <div style="position:absolute;bottom:40px;left:50%;transform:translateX(-50%);font-size:12px;opacity:0.4;">
          Press ESC or double-click to exit
        </div>
      </div>
    `;
  }

  getExcel() {
    return `
      <div style="background:#f0f0f0;width:100%;height:100vh;font-family:'Segoe UI',Calibri,sans-serif;overflow:hidden;">
        <!-- Excel Ribbon -->
        <div style="background:#217346;color:white;padding:8px 16px;font-size:14px;display:flex;align-items:center;gap:20px;">
          <span style="font-weight:600;">📊 Microsoft Excel</span>
          <span style="opacity:0.8;">Q4_Financial_Report.xlsx</span>
        </div>
        
        <!-- Toolbar -->
        <div style="background:#fff;border-bottom:1px solid #d4d4d4;padding:8px 16px;font-size:12px;display:flex;gap:20px;">
          <button style="padding:4px 12px;border:1px solid #ccc;background:white;cursor:default;">File</button>
          <button style="padding:4px 12px;border:1px solid #ccc;background:white;cursor:default;">Home</button>
          <button style="padding:4px 12px;border:1px solid #ccc;background:white;cursor:default;">Insert</button>
          <button style="padding:4px 12px;border:1px solid #ccc;background:white;cursor:default;">Formulas</button>
        </div>
        
        <!-- Spreadsheet -->
        <div style="padding:20px;background:white;height:calc(100vh - 100px);overflow:auto;">
          <table style="border-collapse:collapse;font-size:13px;width:100%;">
            <tr style="background:#f0f0f0;">
              <th style="border:1px solid #ccc;padding:8px;min-width:150px;text-align:left;">Region</th>
              <th style="border:1px solid #ccc;padding:8px;min-width:120px;text-align:right;">Q3 Revenue</th>
              <th style="border:1px solid #ccc;padding:8px;min-width:120px;text-align:right;">Q4 Revenue</th>
              <th style="border:1px solid #ccc;padding:8px;min-width:100px;text-align:right;">Growth %</th>
              <th style="border:1px solid #ccc;padding:8px;min-width:120px;text-align:right;">Forecast</th>
            </tr>
            <tr>
              <td style="border:1px solid #ccc;padding:8px;">North America</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$1,234,567</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$1,456,789</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">18.0%</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$1,650,000</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="border:1px solid #ccc;padding:8px;">Europe</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$987,654</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$1,098,765</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">11.3%</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$1,200,000</td>
            </tr>
            <tr>
              <td style="border:1px solid #ccc;padding:8px;">Asia Pacific</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$2,345,678</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$2,789,012</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">18.9%</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$3,100,000</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="border:1px solid #ccc;padding:8px;">Latin America</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$456,789</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$534,890</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">17.1%</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;">$600,000</td>
            </tr>
            <tr style="background:#e8f5e9;">
              <td style="border:1px solid #ccc;padding:8px;font-weight:bold;">TOTAL</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;font-weight:bold;">$5,024,688</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;font-weight:bold;">$5,879,456</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;font-weight:bold;">17.0%</td>
              <td style="border:1px solid #ccc;padding:8px;text-align:right;font-weight:bold;">$6,550,000</td>
            </tr>
          </table>
        </div>
        
        <div style="position:absolute;bottom:10px;right:20px;font-size:11px;color:#666;">
          Press ESC or double-click to exit
        </div>
      </div>
    `;
  }

  getGmail() {
    return `
      <div style="background:#f6f8fc;width:100%;height:100vh;font-family:'Google Sans','Roboto',Arial,sans-serif;overflow:hidden;">
        <!-- Gmail Header -->
        <div style="background:#fff;border-bottom:1px solid #dadce0;padding:8px 16px;display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:20px;">
            <span style="font-size:22px;color:#5f6368;">Gmail</span>
            <input type="text" placeholder="Search mail" style="padding:8px 12px;border:1px solid #dadce0;border-radius:4px;width:400px;font-size:14px;" />
          </div>
          <div style="color:#5f6368;">user@company.com</div>
        </div>
        
        <!-- Inbox -->
        <div style="display:flex;height:calc(100vh - 60px);">
          <!-- Sidebar -->
          <div style="width:200px;background:#fff;border-right:1px solid #dadce0;padding:16px;">
            <button style="background:#c2e7ff;padding:12px 24px;border:none;border-radius:24px;font-weight:500;cursor:default;margin-bottom:20px;">Compose</button>
            <div style="padding:8px 12px;background:#fce8e6;border-radius:4px;margin-bottom:8px;font-weight:500;">Inbox (3)</div>
            <div style="padding:8px 12px;color:#5f6368;">Starred</div>
            <div style="padding:8px 12px;color:#5f6368;">Sent</div>
            <div style="padding:8px 12px;color:#5f6368;">Drafts</div>
          </div>
          
          <!-- Email List -->
          <div style="flex:1;background:#fff;">
            <div style="border-bottom:1px solid #dadce0;padding:16px;cursor:default;background:#f5f5f5;">
              <div style="font-weight:500;margin-bottom:4px;">Sarah Johnson - RE: Q4 Budget Review</div>
              <div style="font-size:13px;color:#5f6368;">Thanks for the updated numbers. Can we schedule a quick call to discuss...</div>
              <div style="font-size:12px;color:#5f6368;margin-top:4px;">10:34 AM</div>
            </div>
            <div style="border-bottom:1px solid #dadce0;padding:16px;cursor:default;">
              <div style="font-weight:500;margin-bottom:4px;">IT Support - Server Maintenance Notice</div>
              <div style="font-size:13px;color:#5f6368;">Scheduled maintenance window this Saturday from 2-4 AM. Please save...</div>
              <div style="font-size:12px;color:#5f6368;margin-top:4px;">Yesterday</div>
            </div>
            <div style="border-bottom:1px solid #dadce0;padding:16px;cursor:default;">
              <div style="font-weight:500;margin-bottom:4px;">Michael Chen - Project Timeline Update</div>
              <div style="font-size:13px;color:#5f6368;">The design phase is complete. Moving to development next week...</div>
              <div style="font-size:12px;color:#5f6368;margin-top:4px;">Yesterday</div>
            </div>
          </div>
        </div>
        
        <div style="position:absolute;bottom:10px;right:20px;font-size:11px;color:#666;">
          Press ESC or double-click to exit
        </div>
      </div>
    `;
  }

  getVSCode() {
    return `
      <div style="background:#1e1e1e;color:#d4d4d4;width:100%;height:100vh;font-family:'Consolas','Monaco','Courier New',monospace;font-size:14px;overflow:hidden;">
        <!-- VS Code Title Bar -->
        <div style="background:#323233;padding:8px 16px;font-size:13px;border-bottom:1px solid #2d2d30;display:flex;align-items:center;gap:20px;">
          <span style="color:#007acc;font-weight:600;">Visual Studio Code</span>
          <span style="opacity:0.7;">~/projects/company-dashboard/src/components/Dashboard.tsx</span>
        </div>
        
        <!-- Code Editor -->
        <div style="padding:20px;line-height:1.6;">
<pre style="margin:0;color:#d4d4d4;">
<span style="color:#569cd6;">import</span> <span style="color:#4ec9b0;">React</span>, { <span style="color:#9cdcfe;">useState</span>, <span style="color:#9cdcfe;">useEffect</span> } <span style="color:#569cd6;">from</span> <span style="color:#ce9178;">'react'</span>;
<span style="color:#569cd6;">import</span> { <span style="color:#4ec9b0;">Chart</span> } <span style="color:#569cd6;">from</span> <span style="color:#ce9178;">'./Chart'</span>;
<span style="color:#569cd6;">import</span> { <span style="color:#4ec9b0;">DataService</span> } <span style="color:#569cd6;">from</span> <span style="color:#ce9178;">'../services/data'</span>;

<span style="color:#569cd6;">interface</span> <span style="color:#4ec9b0;">DashboardProps</span> {
  userId: <span style="color:#4ec9b0;">string</span>;
  theme?: <span style="color:#ce9178;">'light'</span> | <span style="color:#ce9178;">'dark'</span>;
}

<span style="color:#569cd6;">export const</span> <span style="color:#dcdcaa;">Dashboard</span>: <span style="color:#4ec9b0;">React.FC</span><<span style="color:#4ec9b0;">DashboardProps</span>> = ({ userId, theme = <span style="color:#ce9178;">'light'</span> }) => {
  <span style="color:#569cd6;">const</span> [data, setData] = <span style="color:#dcdcaa;">useState</span>(<span style="color:#b5cea8;">null</span>);
  <span style="color:#569cd6;">const</span> [loading, setLoading] = <span style="color:#dcdcaa;">useState</span>(<span style="color:#569cd6;">true</span>);

  <span style="color:#dcdcaa;">useEffect</span>(() => {
    <span style="color:#569cd6;">const</span> <span style="color:#dcdcaa;">fetchData</span> = <span style="color:#569cd6;">async</span> () => {
      <span style="color:#569cd6;">try</span> {
        <span style="color:#569cd6;">const</span> result = <span style="color:#569cd6;">await</span> DataService.<span style="color:#dcdcaa;">getUserMetrics</span>(userId);
        <span style="color:#dcdcaa;">setData</span>(result);
      } <span style="color:#569cd6;">catch</span> (error) {
        console.<span style="color:#dcdcaa;">error</span>(<span style="color:#ce9178;">'Failed to fetch metrics:'</span>, error);
      } <span style="color:#569cd6;">finally</span> {
        <span style="color:#dcdcaa;">setLoading</span>(<span style="color:#569cd6;">false</span>);
      }
    };

    <span style="color:#dcdcaa;">fetchData</span>();
  }, [userId]);

  <span style="color:#569cd6;">return</span> (
    <<span style="color:#4ec9b0;">div</span> className=<span style="color:#ce9178;">{`dashboard </span><span style="color:#569cd6;">${</span>theme<span style="color:#569cd6;">}</span><span style="color:#ce9178;">`}</span>>
      {loading ? <<span style="color:#4ec9b0;">LoadingSpinner</span> /> : <<span style="color:#4ec9b0;">Chart</span> data=<span style="color:#569cd6;">{</span>data<span style="color:#569cd6;">}</span> />}
    </<span style="color:#4ec9b0;">div</span>>
  );
};
</pre>
        </div>
        
        <!-- Status Bar -->
        <div style="position:absolute;bottom:0;width:100%;background:#007acc;color:white;padding:4px 16px;font-size:12px;display:flex;justify-content:space-between;">
          <div>TypeScript React</div>
          <div>Ln 24, Col 3</div>
        </div>
        
        <div style="position:absolute;bottom:30px;right:20px;font-size:11px;color:#666;background:#1e1e1e;padding:4px 8px;">
          Press ESC or double-click to exit
        </div>
      </div>
    `;
  }

  getTerminal() {
    return `
      <div style="background:#000;color:#00ff00;width:100%;height:100vh;font-family:'Courier New',monospace;font-size:14px;padding:20px;overflow:hidden;">
<pre style="margin:0;line-height:1.4;">
[user@workstation ~]$ sudo systemctl status nginx
● nginx.service - A high performance web server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)
   Active: active (running) since Mon 2026-04-28 09:15:23 UTC; 2h 14min ago
     Docs: man:nginx(8)
 Main PID: 1234 (nginx)
    Tasks: 5 (limit: 4915)
   Memory: 12.4M
   CGroup: /system.slice/nginx.service
           ├─1234 nginx: master process /usr/sbin/nginx
           └─1235 nginx: worker process

Apr 28 09:15:23 workstation systemd[1]: Starting A high performance web server...
Apr 28 09:15:23 workstation systemd[1]: Started A high performance web server.

[user@workstation ~]$ tail -f /var/log/nginx/access.log
192.168.1.45 - - [28/Apr/2026:11:29:15 +0000] "GET /api/dashboard HTTP/1.1" 200 4523
192.168.1.67 - - [28/Apr/2026:11:29:18 +0000] "POST /api/auth/login HTTP/1.1" 200 1842
192.168.1.23 - - [28/Apr/2026:11:29:22 +0000] "GET /api/users/profile HTTP/1.1" 200 2156
192.168.1.89 - - [28/Apr/2026:11:29:25 +0000] "GET /api/metrics HTTP/1.1" 200 8932
192.168.1.45 - - [28/Apr/2026:11:29:28 +0000] "PUT /api/settings HTTP/1.1" 200 512
192.168.1.34 - - [28/Apr/2026:11:29:31 +0000] "GET /api/reports/quarterly HTTP/1.1" 200 15234

<span style="animation:blink 1s infinite;">█</span>
</pre>

        <style>
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        </style>
        
        <div style="position:absolute;bottom:20px;right:20px;font-size:11px;color:#00ff00;opacity:0.5;">
          Press ESC or double-click to exit
        </div>
      </div>
    `;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PanicButton());
} else {
  new PanicButton();
}
