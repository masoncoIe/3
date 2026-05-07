import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    // Validate URL
    const targetUrl = new URL(url);

    // Fetch the content
    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const contentType = response.headers.get("content-type") || "text/html";
    let content = await response.text();

    // If it's HTML, we need to rewrite relative URLs
    if (contentType.includes("text/html")) {
      const baseUrl = `${targetUrl.protocol}//${targetUrl.host}`;

      // Rewrite relative URLs to absolute
      content = content
        // Rewrite href attributes
        .replace(/href="\/(?!\/)/g, `href="${baseUrl}/`)
        .replace(/href='\/(?!\/)/g, `href='${baseUrl}/`)
        // Rewrite src attributes
        .replace(/src="\/(?!\/)/g, `src="${baseUrl}/`)
        .replace(/src='\/(?!\/)/g, `src='${baseUrl}/`)
        // Rewrite action attributes
        .replace(/action="\/(?!\/)/g, `action="${baseUrl}/`)
        .replace(/action='\/(?!\/)/g, `action='${baseUrl}/`)
        // Rewrite url() in CSS
        .replace(/url\(\/(?!\/)/g, `url(${baseUrl}/`)
        .replace(/url\("\/(?!\/)/g, `url("${baseUrl}/`)
        .replace(/url\('\/(?!\/)/g, `url('${baseUrl}/`);

      // Add base tag for any remaining relative URLs
      content = content.replace(
        /<head([^>]*)>/i,
        `<head$1><base href="${baseUrl}/">`
      );
    }

    return new NextResponse(content, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "X-Frame-Options": "ALLOWALL",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);

    // Return an error page that displays nicely in the iframe
    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background: #000;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              text-align: center;
            }
            .error-container {
              max-width: 500px;
              padding: 40px;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 16px;
              color: #fff;
            }
            p {
              color: #666;
              line-height: 1.6;
            }
            .url {
              font-family: monospace;
              background: #111;
              padding: 8px 16px;
              border-radius: 4px;
              margin: 16px 0;
              word-break: break-all;
              font-size: 12px;
              color: #888;
            }
            .tip {
              margin-top: 24px;
              padding: 16px;
              background: #0a0a0a;
              border: 1px solid #222;
              border-radius: 8px;
            }
            .tip h2 {
              font-size: 14px;
              margin-bottom: 8px;
              color: #fff;
            }
            .tip p {
              font-size: 13px;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>Unable to Load Page</h1>
            <p>This site cannot be loaded through the proxy.</p>
            <div class="url">${url}</div>
            <div class="tip">
              <h2>Why does this happen?</h2>
              <p>Some sites block proxy access, use advanced security measures, or require direct connections. Try searching on DuckDuckGo instead.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(errorHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
