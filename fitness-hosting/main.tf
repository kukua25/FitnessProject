# 1️⃣ Random suffix so every bucket name is unique across AWS
resource "random_string" "suffix" {
  length  = 6
  special = false
}

# 2️⃣ Static‑website S3 bucket
resource "aws_s3_bucket" "site" {
  bucket = "${var.site_name}-${random_string.suffix.result}"

  # Enable static‑website hosting
  website {
    index_document = var.index_file
    error_document = var.error_file
  }

  tags = {
    Project = "FitnessSimplified"
  }
}

# 3️⃣ Allow the bucket to serve public objects (Terraform manages the policy)
resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "public_read" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.public_read.json
}

# 4️⃣ Upload local files under /site into the bucket
locals {
  site_files = fileset("${path.module}/site", "**")
}

resource "aws_s3_object" "assets" {
  for_each = { for f in local.site_files : f => f }

  bucket = aws_s3_bucket.site.id
  key    = each.value
  source = "${path.module}/site/${each.value}"
  etag   = filemd5("${path.module}/site/${each.value}")

  content_type = lookup(
    {
      html = "text/html",
      css  = "text/css",
      js   = "application/javascript"
    },
    regex(".*\\.(.*)$", each.value)[0],
    "binary/octet-stream"
  )
}