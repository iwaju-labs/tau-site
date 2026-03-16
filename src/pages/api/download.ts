import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const os = url.searchParams.get('os'); // 'windows' or 'mac'

  try {
    let ymlUrl = '';
    
    if (os === 'mac') {
      ymlUrl = 'https://releases.trytau.app/latest-mac.yml';
    } else {
      ymlUrl = 'https://releases.trytau.app/latest.yml';
    }

    const response = await fetch(ymlUrl);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${ymlUrl}: ${response.statusText}`);
      // Fallback for when no releases exist yet
      return new Response('No release found yet. Please check back later.', { status: 404 });
    }

    const ymlText = await response.text();
    
    // Parse the path line out of the YAML using Regex (efficient, no libraries needed)
    // latest.yml typically contains a line like: "path: Tau-Setup-1.0.0.exe"
    const pathMatch = ymlText.match(/^path:\s*(.+)$/m);
    
    if (pathMatch && pathMatch[1]) {
      const filename = pathMatch[1].trim();
      const downloadUrl = `https://releases.trytau.app/${filename}`;
      
      // Redirect the user's browser straight to the Cloudflare R2 file
      return redirect(downloadUrl, 302);
    } else {
      console.error('Could not parse path from yml:', ymlText);
      return new Response('Error parsing release metadata.', { status: 500 });
    }
    
  } catch (error) {
    console.error('Download routing error:', error);
    return new Response('Error handling download.', { status: 500 });
  }
};
