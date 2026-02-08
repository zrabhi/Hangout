/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactor without bug fix or feature
        'perf',     // Performance improvements
        'test',     // Test additions or updates
        'build',    // Build-related changes
        'ci',       // CI-related changes
        'chore',    // Maintenance tasks
        'revert',   
      ]
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
  },
  
 // plugins: [
    // {
    //   rules: {
    //     'type-enum': ({ subject }) => {
    //       const allowedTypes = [
    //         'feat',
    //         'fix',
    //         'docs',
    //         'style',
    //         'refactor',
    //         'perf',
    //         'test',
    //         'build',
    //         'ci',
    //         'chore',
    //         'revert',
    //       ];

    //       const found = allowedTypes.some((type) =>
    //         subject.toLowerCase().includes(type)
    //       );

    //       return [
    //         found,
    //         `Subject must include at least one of the allowed types: ${allowedTypes.join(', ')}`,
    //       ];
    //     },
    //   },
    // },
  //],
};