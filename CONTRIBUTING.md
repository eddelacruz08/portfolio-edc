# Contributing to Portfolio EDC

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/portfolio-edc.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Set up environment variables (see README.md)
6. Start development server: `npm run dev`

## 💻 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting (we use ESLint)
- Write meaningful commit messages
- Keep components small and focused
- Use semantic HTML elements

### Component Guidelines

- Place reusable components in `/components`
- Place feature-specific components in `/components/[feature]`
- Use shadcn/ui components when possible
- Always include TypeScript types
- Add accessibility attributes (ARIA labels, roles)

### Commit Messages

Follow the conventional commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:

```
feat(projects): add filter by technology
fix(contact): resolve form validation issue
docs(readme): update installation instructions
```

## 🧪 Testing

Before submitting a PR:

1. Run the linter: `npm run lint`
2. Build the project: `npm run build`
3. Test all pages manually
4. Check accessibility with browser DevTools
5. Test on mobile viewport

## 📝 Pull Request Process

1. Update documentation if needed
2. Test your changes thoroughly
3. Run linter and fix any issues
4. Create a PR with a clear title and description
5. Link any related issues
6. Wait for review and address feedback

## 🐛 Reporting Bugs

When reporting bugs, include:

- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and OS information
- Error messages or console logs

## 💡 Feature Requests

Feature requests are welcome! Please:

- Check if the feature already exists
- Describe the problem it solves
- Provide use cases
- Suggest implementation (optional)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's guidelines

## 🎯 Good First Issues

Look for issues tagged with `good first issue` if you're new to the project.

## 📞 Questions?

Feel free to open an issue for questions or reach out via the contact form on the site.

Thank you for contributing! 🙏
