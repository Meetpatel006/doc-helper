import type { Request, Response, NextFunction } from 'express'

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err)

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid input data',
      details: err.message
    })
  }

  if (err.name === 'PuppeteerError') {
    return res.status(500).json({
      success: false,
      error: 'Failed to process webpage',
      details: err.message
    })
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
} 
