module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    //  less
    less: {
      development: {
        // definir arquivo final e arquivo de origem
        files: {
          "dev/styles/main.css": "src/styles/main.less",
        },
      },
      // minificar o codigo
      production: {
        options: {
          compress: true,
        },
        files: {
          "dist/styles/main.min.css": "src/styles/main.less",
        },
      },
    },

    watch: {
      less: {
        files: ["src/styles/**/*.less"],
        tasks: ["less:development"],
      },
      html: {
        files: ["src/index.html"],
        tasks: ["replace:dev"],
      },
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "ENDERCO_DO_CSS",
              replacement: "./styles/main.css",
            },
            {
              match: "ENDERECO_DO_JS",
              replacement: "../src/scripts/main.js",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
      // produçaõ
      dist: {
        options: {
          patterns: [
            {
              match: "ENDERCO_DO_CSS",
              replacement: "./styles/main.min.css",
            },
            {
              match: "ENDERECO_DO_JS",
              replacement: "./scripts/main.min.js",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["prebuild/index.html"],
            dest: "dist/",
          },
        ],
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "prebuild/index.html": "src/index.html",
        },
      },
    },
    clean: ["prebuild"],
    // minificar js
    uglify: {
      target: {
        files: {
          "dist/scripts/main.min.js": "src/scripts/main.js",
        },
      },
    },
  });

  // less
  grunt.loadNpmTasks("grunt-contrib-less");
  // watch
  grunt.loadNpmTasks("grunt-contrib-watch");
  // plugin para separar ambiente dev e dist
  grunt.loadNpmTasks("grunt-replace");
  // plugin para minificar html
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  // Plugin para limpar as pastas temporarias
  grunt.loadNpmTasks("grunt-contrib-clean");
  // minificar javascript
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // tarefa
  grunt.registerTask("default", ["watch"]);

  grunt.registerTask("build", [
    "less:production",
    "htmlmin:dist",
    "replace:dist",
    "clean",
    "uglify",
  ]);
};
