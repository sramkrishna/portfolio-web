# Portfolio Website

A Hugo-based portfolio website template with GitHub Pages deployment.

## Features

- Custom Hugo theme (`portfolio`)
- GitHub Actions workflow for automatic deployment
- Sample content structure
- Ready for GitHub Pages hosting

## Prerequisites

- Hugo Extended v0.147.8+ ([installation guide](https://gohugo.io/installation/))
- Git

## Local Development

1. Clone this repository:
```bash
git clone <your-repo-url>
cd portfolio-web
```

2. Run the development server:
```bash
hugo server -D
```

3. Open your browser to `http://localhost:1313`

## Project Structure

```
.
├── .github/workflows/  # GitHub Actions deployment workflow
├── content/            # Your content (markdown files)
│   ├── _index.md      # Homepage content
│   └── posts/         # Blog posts
├── themes/portfolio/   # Custom theme
├── hugo.toml          # Site configuration
└── README.md
```

## Creating Content

### New Blog Post
```bash
hugo new content posts/my-new-post.md
```

### New Page
```bash
hugo new content about.md
```

## Customization

### Site Configuration
Edit `hugo.toml` to customize:
- Site title and description
- Base URL
- Author information
- Theme settings

### Theme
The custom theme is located in `themes/portfolio/`. Modify layouts and assets there to customize the design.

## Deployment to GitHub Pages

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The site will automatically deploy on every push to the main branch

Your site will be available at `https://<username>.github.io/<repository-name>/`

## Building for Production

```bash
hugo --gc --minify
```

The built site will be in the `public/` directory.

## License

See [LICENSE](LICENSE) file for details.
