import { config } from 'dotenv';
import path from 'path';
const pathConfig = path.join(process.cwd(), '.env');
config({ path: pathConfig });
