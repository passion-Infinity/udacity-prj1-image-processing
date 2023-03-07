import path from 'path';
import fs from 'fs/promises';
import File from '../utils/file';

describe('Test image processing with sharp', (): void => {
  it('throws an error (invalid height value)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'foo',
      width: '100',
      height: '-100',
    });
    expect(error).not.toBeNull();
  });

  it('throws an error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'abc.png',
      width: '100',
      height: '500',
    });
    expect(error).not.toBeNull();
  });

  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await File.createThumb({
      filename: 'songoku.png',
      width: '100',
      height: '100',
    });

    const resizedImagePath: string = path.resolve(
      File.imgThumb,
      `songoku-100x100.png`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imgThumb,
    `songoku-99x99.png`
  );
  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    //
  }
});
