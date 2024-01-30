import { Server } from './server';

const PORT = process.env.PORT || '3030';

async function main() {
  const server = new Server(PORT);
  try {
    await server.listen();
    console.log(`Server running in port ${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

main();
