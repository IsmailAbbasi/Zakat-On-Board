import { createClient } from '@/lib/supabase/client';

/**
 * Uploads a file to Supabase storage
 * @param {File} file - File to upload
 * @param {string} bucket - Storage bucket name
 * @param {string} path - Path in bucket
 * @returns {Promise<{url: string, path: string}>}
 */
export async function uploadFile(file, bucket = 'charity-images', path) {
  const supabase = createClient();
  
  const fileName = path || `${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    url: publicUrl,
    path: data.path,
  };
}

/**
 * Deletes a file from Supabase storage
 * @param {string} path - File path in bucket
 * @param {string} bucket - Storage bucket name
 */
export async function deleteFile(path, bucket = 'charity-images') {
  const supabase = createClient();
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Gets public URL for a file
 * @param {string} path - File path in bucket
 * @param {string} bucket - Storage bucket name
 * @returns {string}
 */
export function getPublicUrl(path, bucket = 'charity-images') {
  const supabase = createClient();
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}
