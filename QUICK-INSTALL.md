# 🚀 **Quick Install - Copilot Terminal MCP Server**

## ⚡ **30-Second Installation**

### **Option 1: Automatic Installation (Ultra-Simple)**

```bash
npx copilot-terminal-mcp-server install
```

**That's it!** 🎉 The server will be automatically configured in VS Code.

### **Option 2: Global Installation**

```bash
# 1. Installation
npm install -g copilot-terminal-mcp-server

# 2. Automatic configuration
copilot-terminal-install install
```

## ✅ **Installation Verification**

```bash
# Check status
npx copilot-terminal-mcp-server status
```

**Expected result:**
```
📊 Copilot Terminal MCP Server Status...

📍 System configuration:
   Platform: win32
   Node.js: v18.0.0+
   ✅ MCP configuration found
   ✅ Copilot Terminal configured

📦 Server files:
   ✅ Main server
   ✅ Dist directory
```

## 🔄 **Activation**

1. **Restart VS Code**
2. **Open GitHub Copilot Chat**  
3. **Test**:
   ```
   @workspace List all active terminals
   ```

## 🚀 **First Test**

```
@workspace Create a terminal named "test" and display "Hello MCP Server!"
```

**Expected result:** Terminal created and message displayed instantly!

## 🛠️ **Quick Troubleshooting**

### **❌ "MCP server not found"**
```bash
npx copilot-terminal-mcp-server install --force
```

### **❌ "Permission denied"**  
```bash
# Windows (Administrator)
npm install -g copilot-terminal-mcp-server

# macOS/Linux  
sudo npm install -g copilot-terminal-mcp-server
```

## 🎯 **Immediate Usage**

### **Magic Commands with GitHub Copilot:**

```
🚀 Development server:
@workspace Launch npm start in terminal "dev-server"

🧪 Automated testing:
@workspace Run tests in watch mode in terminal "tests"

🔍 Monitoring:
@workspace Show output from all active terminals

🛠️ Multi-tasking:
@workspace Launch backend AND frontend in parallel
```

## 📊 **Key Features**

- ⚡ **Instant response** (< 10ms)
- 🔄 **Zero blocking** (no more 30s timeouts)  
- 🚀 **Parallelism** (multiple simultaneous servers)
- 📈 **Real-time monitoring**
- 🧠 **Intelligent auto-recovery**
- 🔧 **34 powerful tools**

---

**🎉 Installation successful! Your development just became 10x more productive!**

[📖 Complete documentation](README.md) • [🐛 Support](https://github.com/menoxz/Copilot-terminal-MCP/issues)
