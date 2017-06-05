const helloWorld = `#include <stdio.h>
int main(void) {
    printf('hello world');
}`;

const languages = [
    "abap",
    "actionscript",
    "ada",
    "apache",
    "applescript",
    "asciidoc",
    "assembly",
    "autohotkey",
    "batchfile",
    "bro",
    "c",
    "cirru",
    "clojure",
    "cobol",
    "coffee",
    "coldfusion",
    "csharp",
    "css",
    "d",
    "dart",
    "diff",
    "django",
    "dockerfile",
    "dot",
    "eiffel",
    "ejs",
    "elixir",
    "elm",
    "erlang",
    "forth",
    "fortran",
    "ftl",
    "gcode",
    "gherkin",
    "glsl",
    "golang",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "html",
    "ini",
    "io",
    "jade",
    "java",
    "javascript",
    "json",
    "jsoniq",
    "jsp",
    "jsx",
    "julia",
    "kotlin",
    "less",
    "liquid",
    "lisp",
    "livescript",
    "lsl",
    "lua",
    "makefile",
    "markdown",
    "mask",
    "matlab",
    "nix",
    "nsis",
    "objectivec",
    "ocaml",
    "pascal",
    "perl",
    "php",
    "pig",
    "powershell",
    "prolog",
    "protobuf",
    "python",
    "r",
    "rdoc",
    "rhtml",
    "rst",
    "ruby",
    "rust",
    "sass",
    "scad",
    "scala",
    "scheme",
    "scss",
    "sh",
    "smarty",
    "sparql",
    "sql",
    "stylus",
    "swift",
    "tcl",
    "tex",
    "toml",
    "tsx",
    "turtle",
    "twig",
    "typescript",
    "vala",
    "vb",
    "verilog",
    "vhdl",
    "xml",
    "xquery",
    "yaml",
];

const textarea = document.querySelector("textarea");
const output = document.querySelector("output");

const getMarkdown = snippet => {
    snippet = (snippet || helloWorld).replace(/```/g, "\x91");
    let body = languages.map(l => "## \\`\\`\\`" + l + "\n```" + l + "\n" + snippet + "\n```\n\\`\\`\\`").join("\n\n");

    output.innerHTML = "<em>Loading...</em>";

    return fetch("https://api.github.com/markdown/raw", {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body,
    })
        .then(response => response.text())
        .then(html => html.replace(/\x91/g, "```"))
        .catch(err => err && err.message)
        .then(html => output.innerHTML = html);
};

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    getMarkdown(textarea.value);
});

textarea.addEventListener("keydown", event => {
    if (event.keyCode === 13 /*ENTER*/ && event.ctrlKey) {
        event.preventDefault();
        getMarkdown(textarea.value);
    }
});

textarea.placeholder = helloWorld;
// getMarkdown();
