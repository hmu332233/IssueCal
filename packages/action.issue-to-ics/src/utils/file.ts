import * as fs from 'fs';

function mkdir(dirPath: string) {
  const isExists = fs.existsSync(dirPath);
  if (!isExists) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function createJsonFile(path: string, data: any) {
  const dateString = new Date().toISOString().slice(0, 10);

  const lastObj = {
    updatedAt: dateString,
  };

  mkdir(path);
  fs.writeFileSync(`${path}/meta.json`, JSON.stringify(lastObj));
  fs.writeFileSync(`${path}/events.json`, JSON.stringify(data));
}

export function createIcsFile(path: string, data: any) {
  mkdir(path);
  fs.writeFileSync(`${path}/events.ics`, data);
}

export function readJsonFile(path: string) {
  if (!fs.existsSync(path)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(`${path}/events.json`, 'utf8'));
}
