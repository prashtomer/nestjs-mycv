import { rm } from 'fs/promises';
import { join } from 'path';

// delete the test.sqlite datbase before every single test or else data will persist and fail the signup test because already there will be an email entry created during first run of that test so second run will fail
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});
