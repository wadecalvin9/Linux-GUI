  const terminal = document.getElementById("terminal");
    const input = document.getElementById("input");
    const bootMsg = document.getElementById("boot-msg");

   
    const fs = {
      "/": ["home", "etc", "var", "tmp"],
      "/home": ["user", "guest"],
      "/home/user": ["Documents", "Downloads", "Pictures"],
    };
    let cwd = "/";

   
    const history = [];
    let historyIndex = -1;

  
    const message = "Welcome to Kali Web Terminal. Type 'help' to begin.";
    let i = 0;
    function typeBoot() {
      if (i < message.length) {
        bootMsg.textContent += message.charAt(i++);
        setTimeout(typeBoot, 30);
      }
    }
    typeBoot();

    function newPrompt() {
      const line = document.createElement("div");
      line.className = "line";
      const prompt = document.createElement("span");
      prompt.className = "prompt";
      prompt.textContent = `kali:${cwd}$`;
      const newInput = document.createElement("input");
      newInput.autocomplete = "off";
      newInput.spellcheck = false;
      newInput.addEventListener("keydown", handleCommand);
      line.append(prompt, newInput);
      terminal.appendChild(line);
      newInput.focus();
      terminal.scrollTop = terminal.scrollHeight;
    }

    function printOutput(text) {
      const line = document.createElement("div");
      line.className = "output";
      line.textContent = text;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }

    function handleCommand(e) {
      if (e.key === "ArrowUp") {
        if (history.length && historyIndex > 0) {
          historyIndex--;
          e.target.value = history[historyIndex];
        }
        return;
      }
      if (e.key === "ArrowDown") {
        if (history.length && historyIndex < history.length - 1) {
          historyIndex++;
          e.target.value = history[historyIndex];
        } else {
          e.target.value = "";
        }
        return;
      }

      if (e.key !== "Enter") return;

      const cmd = e.target.value.trim();
      e.target.disabled = true;
      history.push(cmd);
      historyIndex = history.length;

      const [command, ...args] = cmd.split(" ");
      switch (command) {
        case "help":
          printOutput("Available commands:\nhelp, clear, about, ls, cd");
          break;
        case "about":
          printOutput("Kali Web Terminal v1.0 — a simulated web shell demo.");
          break;
        case "clear":
          terminal.innerHTML = "";
          newPrompt();
          return;
        case "ls":
          const dir = fs[cwd] || [];
          printOutput(dir.join("  "));
          break;
        case "cd":
          const path = args[0];
          if (!path) {
            cwd = "/";
            break;
          }
          const newPath =
            path === ".."
              ? cwd.split("/").slice(0, -1).join("/") || "/"
              : cwd === "/"
              ? "/" + path
              : cwd + "/" + path;
          if (fs[newPath]) {
            cwd = newPath;
          } else {
            printOutput("No such directory: " + path);
          }
          break;
        case "":
          break;
        default:
          printOutput("Unknown command: " + command);
      }

      newPrompt();
    }

    input.addEventListener("keydown", handleCommand);