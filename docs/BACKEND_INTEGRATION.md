# Backend Integration Summary

## Overview

This admin panel has been updated to integrate with a REST API backend instead of using mock data. All CRUD operations now make HTTP requests to the backend server.

## Environment Configuration

### Frontend Configuration

The frontend uses an environment variable to configure the backend URL:

```env
VITE_API_BASE_URL=http://localhost:8080
```

To configure:
1. Copy `.env.example` to `.env`
2. Update `VITE_API_BASE_URL` with your backend server URL

### Docker Configuration

When building the Docker image, you can pass the backend URL as a build argument or configure it through environment variables before the build.

For development:
```bash
VITE_API_BASE_URL=http://localhost:8080 npm run dev
```

For production build:
```bash
VITE_API_BASE_URL=https://api.launchdate.com npm run build
```

## Architecture Changes

### Service Layer

Created a new service layer in `src/services/` with the following structure:

- **apiClient.ts** - Generic HTTP client with error handling
- **rocketService.ts** - Rockets CRUD operations
- **launchService.ts** - Launches CRUD operations
- **newsService.ts** - News CRUD operations
- **launchBaseService.ts** - Launch bases CRUD operations
- **companyService.ts** - Companies CRUD operations
- **statsService.ts** - Dashboard statistics

### Page Components

All page components have been updated to:
- Fetch data from the backend API on component mount using `useEffect`
- Show loading states while fetching data
- Display error messages when API calls fail
- Call appropriate API endpoints for create, update, and delete operations

## API Requirements

Please refer to [API_REQUIREMENTS.md](./API_REQUIREMENTS.md) for complete API specifications.

### Key Requirements

1. **Base URL**: All endpoints should be under `/api/`
2. **Content Type**: All requests/responses should use `application/json`
3. **CORS**: Backend must enable CORS to allow requests from the admin frontend
4. **Error Handling**: Return appropriate HTTP status codes and error messages

### Endpoints Summary

- **Rockets**: `/api/rockets` (GET, POST, PUT, DELETE)
- **Launches**: `/api/launches` (GET, POST, PUT, DELETE)
- **News**: `/api/news` (GET, POST, PUT, DELETE)
- **Launch Bases**: `/api/launch-bases` (GET, POST, PUT, DELETE)
- **Companies**: `/api/companies` (GET, POST, PUT, DELETE)
- **Statistics**: `/api/stats` (GET)

## Error Handling

The frontend handles errors gracefully:
- Network errors are caught and displayed to users
- HTTP error responses show the error message
- Users can retry operations that fail

## Testing the Integration

### 1. Start the Backend

Ensure your backend server is running and accessible at the configured URL.

### 2. Start the Admin Panel

```bash
npm install
npm run dev
```

### 3. Test Each Feature

- Navigate to each page (Rockets, Launches, News, Launch Bases, Companies)
- Verify data loads correctly
- Test create, update, and delete operations
- Check that the Dashboard shows correct statistics

## Deployment Considerations

### Production Build

The production build will include the environment variable value at build time:

```bash
VITE_API_BASE_URL=https://api.launchdate.com npm run build
```

### Docker Deployment

The Dockerfile uses a multi-stage build:
1. Build stage: Compiles the application with environment variables
2. Production stage: Serves static files with nginx

To build with custom backend URL:
```bash
docker build --build-arg VITE_API_BASE_URL=https://api.launchdate.com -t launchdate-admin .
```

### Nginx Configuration

The included `nginx.conf` file serves the SPA and handles client-side routing. It does NOT proxy API requests - the frontend makes direct requests to the backend URL configured via environment variables.

## Future Enhancements

Recommended improvements for production:
1. Add authentication/authorization
2. Implement request caching
3. Add request interceptors for authentication tokens
4. Implement optimistic updates for better UX
5. Add data validation before API calls
6. Implement pagination for large datasets
7. Add search and filtering capabilities

## Support

For issues or questions about the API integration, please refer to the API_REQUIREMENTS.md document or create an issue in the repository.
