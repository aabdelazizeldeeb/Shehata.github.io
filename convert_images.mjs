import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicAssetsDir = path.join(__dirname, 'public', 'assets', 'images');

async function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.heic', '.heif'].includes(ext)) {
                const baseName = path.basename(entry.name, ext);
                // Remove weird extensions like .HEIC-standard v2-1x
                const cleanName = baseName.split('.')[0];
                const webpPath = path.join(dir, `${cleanName}.webp`);
                
                try {
                    console.log(`Converting ${fullPath} to ${webpPath}...`);
                    await sharp(fullPath)
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    
                    // Only delete if successful
                    fs.unlinkSync(fullPath);
                    
                    // Output relative path for the data.js update
                    const relativePath = webpPath.split('public\\')[1].replace(/\\/g, '/');
                    console.log(`[SUCCESS] ${relativePath}`);
                } catch (error) {
                    console.error(`[ERROR] Failed to convert ${fullPath}:`, error.message);
                }
            }
        }
    }
}

processDirectory(publicAssetsDir).then(() => {
    console.log('Conversion complete!');
});
