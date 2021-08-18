import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  //output: process.stdout
});

export const readConsole = () => {
  return new Promise((resolve, reject) => {
    rl.question('',(answer) => {
      resolve(answer)
      rl.close()
    })
  })
}