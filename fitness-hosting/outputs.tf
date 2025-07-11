output "bucket_name" {
  value       = aws_s3_bucket.site.id
  description = "The physical name of the S3 bucket."
}

output "website_endpoint" {
  value       = aws_s3_bucket.site.website_endpoint
  description = "Public HTTP endpoint for the static site."
}
