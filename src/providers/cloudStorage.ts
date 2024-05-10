import {Storage} from '@google-cloud/storage';
import * as path from 'path';
import { storageKeyPath, storageProjectId } from './locals';

const serviceKey = path.join(__dirname, `../../${storageKeyPath}`);
const CloudStorage = new Storage({
    keyFilename: serviceKey,
    projectId: storageProjectId
});

export default CloudStorage;