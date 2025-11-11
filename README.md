# Whitigol's Documentation

A comprehensive open source documentation site for Whitigol Software projects, built with [TanStack Start](https://tanstack.com/start) and [Fumadocs](https://fumadocs.dev).

## 📚 Documentation Sections

This documentation covers:

- **Software** - Documentation for all software projects
- **NPM Packages** - Documentation for published NPM packages
- **FiveM Scripts** - Documentation for FiveM server scripts and resources

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- Bun (package manager)

### Installation

```bash
# Install dependencies
bun install
```

### Development

Run the development server:

```bash
bun dev
```

The documentation will be available at `http://localhost:3000`

### Building

Build the documentation for production:

```bash
bun build
```

### Production

Start the production server:

```bash
bun start
```

## 📁 Project Structure

```
.
├── content/
│   └── docs/              # Documentation content (MDX files)
│       ├── software/      # Software documentation
│       ├── npm-packages/  # NPM packages documentation
│       └── fivem-scripts/ # FiveM scripts documentation
├── src/
│   ├── components/        # React components
│   ├── routes/           # TanStack Router routes
│   └── lib/              # Shared utilities and configurations
├── public/               # Static assets
└── source.config.ts      # Fumadocs configuration
```

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- **Documentation**: [Fumadocs](https://fumadocs.dev) - Documentation framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com)
- **Content**: MDX (Markdown + JSX)
- **Icons**: [Lucide](https://lucide.dev) + [React Icons](https://react-icons.github.io/react-icons)

## 📝 Writing Documentation

Documentation is written in MDX format and located in the `content/docs/` directory. Each section can have its own folder structure with:

- `index.mdx` - Main page for the section
- `meta.json` - Metadata and page ordering
- Additional `.mdx` files for sub-pages

### Example Structure

```
content/docs/
└── my-section/
    ├── index.mdx
    ├── meta.json
    └── sub-page.mdx
```

## 🔗 Links

- **GitHub Repository**: [whitigol/docs](https://github.com/whitigol/docs)
- **Discord Server**: [Join Discord](https://discord.gg/NuPCpBa4Vy)

## 🤝 Contributing

Contributions are welcome! This is an open source project, and we appreciate any help you can provide.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Reporting Issues

If you find any issues or have suggestions for improvements, please open an issue on [GitHub](https://github.com/whitigol/docs/issues).

### Documentation Contributions

When contributing documentation:
- Follow the existing MDX format
- Ensure all code examples are tested and working
- Keep the writing clear and concise
- Update the relevant `meta.json` files if adding new pages

## 📄 License

This project is open source. Please check the repository for the specific license details.

---

Built with ❤️ by Whitigol
