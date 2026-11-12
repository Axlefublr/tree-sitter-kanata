/**
 * @file Kanata grammar for tree-sitter
 * @author Axlefublr <axlefublr.ls@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "kanata",

  extras: $ => [$.comment, $._whitespace],

  rules: {
    source_file: $ => repeat($._toplevel),
    _toplevel: $ => choice(
      $.deflayermap,
    ),

    deflayermap: $ => seq('(', 'deflayermap', '(', $.layer_name, ')', repeat($.mapping), ')'),

    mapping: $ => seq($.key, $._key_expression),

    _key_expression: $ => choice(
      $.key,
      $.number,
      $._command,
    ),

    _expression: $ => choice(
      $.plain,
      $.quoted,
      $._command,
    ),

    _command: $ => choice(
      $.command,
      $.layer_command,
      $.multi,
    ),

    multi: $ => seq('(', alias('multi', $.known_command), repeat($._key_expression), ')'),

    layer_command: $ => seq(
      '(',
      alias(
        choice(
          'layer-toggle', 'layer-while-held', 'layer-switch'
        ),
        $.known_command
      ),
      $.layer_name,
      ')'
    ),

    command: $ => seq('(', $.known_command, repeat($._expression), ')'),

    known_command: _ => choice(
      'arbitrary-code',
      'caps-word',
      'caps-word-custom',
      'caps-word-custom-toggle',
      'caps-word-toggle',
      'clipboard-cmd-set',
      'clipboard-restore',
      'clipboard-save',
      'clipboard-save-cmd-set',
      'clipboard-save-swap',
      'clipboard-set',
      'cmd',
      'cmd-log',
      'cmd-output-keys',
      'concat',
      'defalias',
      'defaliasenvcond',
      'defcfg',
      'defchords',
      'defchordsv2',
      'deflayer',
      'deflayermap',
      'deflocalkeys-linux',
      'deflocalkeys-macos',
      'deflocalkeys-win',
      'deflocalkeys-winiov2',
      'deflocalkeys-wintercept',
      'defoverrides',
      'defseq',
      'defsrc',
      'deftemplate',
      'defvar',
      'defvirtualkeys',
      'defzippy',
      'dynamic-macro-play',
      'dynamic-macro-record',
      'dynamic-macro-record-stop',
      'dynamic-macro-record-stop-truncate',
      'environment',
      'fork',
      'hold-for-duration',
      'if-equal',
      'if-in-list',
      'if-not-equal',
      'if-not-in-list',
      'include',
      'macro',
      'macro-cancel-on-press',
      'macro-release-cancel',
      'macro-release-cancel-and-cancel-on-press',
      'macro-repeat',
      'macro-repeat-',
      'macro-repeat-cancel-on-press',
      'macro-repeat-release-cancel',
      'macro-repeat-release-cancel-and-cancel-on-press',
      'movemouse-accel-down',
      'movemouse-accel-left',
      'movemouse-accel-right',
      'movemouse-accel-up',
      'movemouse-down',
      'movemouse-left',
      'movemouse-right',
      'movemouse-speed',
      'movemouse-up',
      'mwheel-down',
      'mwheel-left',
      'mwheel-right',
      'mwheel-up',
      'on-idle',
      'on-physical-idle',
      choice('on-press', 'on↓'),
      choice('on-release', 'on↑'),
      'one-shot',
      'one-shot-pause-processing',
      'one-shot-press',
      'one-shot-press-pcancel',
      'one-shot-release',
      'one-shot-release-pcancel',
      'platform',
      'release-key',
      choice('release-layer', 'layer↑'),
      'sequence',
      'sequence-noerase',
      'setmouse',
      'tap-dance',
      'tap-dance-eager',
      'tap-hold',
      'tap-hold-except-keys',
      'tap-hold-press',
      'tap-hold-press-timeout',
      'tap-hold-release',
      'tap-hold-release-keys',
      'tap-hold-release-timeout',
      'template-expand',
      'unicode',
      'unmod',

      // ideally should be in its own rule
      't!',
      'switch',
      'or',
      'and',
      'not',
      'key-history',
      'key-timing',
      'input',
      'input-history',
      'layer',
      'base-layer',
    ),

    comment: $ => prec(1000, seq(token(prec(1000, seq(';;', /[ \t]*/))), $.inner_comment)),
    inner_comment: _ => token(prec(1000, /.*/)),

    quoted: $ => seq('"', optional($.inner_quoted), '"'),
    inner_quoted: _ => /[^\r\n"]+/,

    number: _ => /\d+/,
    plain: _ => /[^\s()"]+/,
    key: _ => /[^\s()]+/,
    layer_name: _ => /[^\s()]+/,
    _whitespace: _ => /\s+/,
  }
});
