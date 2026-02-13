# PowerShell script to replace hardcoded brand colors in dashboard codebase
# Run with: .\scripts\update-dashboard-colors.ps1

$ErrorActionPreference = "Stop"
$filesProcessed = 0
$totalReplacements = 0

# Define replacement patterns
$replacements = @(
    # Tailwind classes
    @{ Pattern = '\bbg-purple-600\b'; Replacement = 'bg-primary' },
    @{ Pattern = '\bbg-purple-700\b'; Replacement = 'bg-primary' },
    @{ Pattern = '\bbg-violet-600\b'; Replacement = 'bg-primary' },
    @{ Pattern = '\bbg-violet-700\b'; Replacement = 'bg-primary' },
    @{ Pattern = '\bbg-purple-50\b'; Replacement = 'bg-primary/5' },
    @{ Pattern = '\bbg-violet-50\b'; Replacement = 'bg-primary/5' },
    @{ Pattern = '\bbg-purple-100\b'; Replacement = 'bg-primary/10' },
    @{ Pattern = '\bbg-violet-100\b'; Replacement = 'bg-primary/10' },
    @{ Pattern = '\btext-purple-600\b'; Replacement = 'text-primary' },
    @{ Pattern = '\btext-purple-700\b'; Replacement = 'text-primary' },
    @{ Pattern = '\btext-violet-600\b'; Replacement = 'text-primary' },
    @{ Pattern = '\btext-violet-700\b'; Replacement = 'text-primary' },
    @{ Pattern = '\bborder-purple-600\b'; Replacement = 'border-primary' },
    @{ Pattern = '\bborder-violet-600\b'; Replacement = 'border-primary' },
    @{ Pattern = '\bhover:bg-purple-700\b'; Replacement = 'hover:bg-primary/90' },
    @{ Pattern = '\bhover:bg-violet-700\b'; Replacement = 'hover:bg-primary/90' },
    @{ Pattern = '\bhover:text-purple-600\b'; Replacement = 'hover:text-primary' },
    @{ Pattern = '\bhover:text-violet-600\b'; Replacement = 'hover:text-primary' },
    @{ Pattern = '\bhover:text-violet-700\b'; Replacement = 'hover:text-primary' },
    @{ Pattern = '\bfrom-purple-600\b'; Replacement = 'from-primary' },
    @{ Pattern = '\bfrom-violet-600\b'; Replacement = 'from-primary' },
    @{ Pattern = '\bfrom-violet-500\b'; Replacement = 'from-primary' },
    @{ Pattern = '\bto-blue-600\b'; Replacement = 'to-accent' },
    @{ Pattern = '\bto-blue-500\b'; Replacement = 'to-accent' },
    
    # Inline hex colors
    @{ Pattern = '#7c3aed'; Replacement = 'var(--brand-primary, #0066cc)' },
    @{ Pattern = '#2563eb'; Replacement = 'var(--brand-accent, #10b981)' }
)

# Paths to process (dashboard only, excluding marketing)
$paths = @(
    "apps\web\src\app\(dashboard)",
    "apps\web\src\components\dashboard",
    "apps\web\src\components\billing",
    "apps\web\src\components\feedback",
    "apps\web\src\components\partners",
    "apps\web\src\components\employee"
)

# Files to skip
$skipFiles = @(
    "branding-context.tsx",
    "brand-colors.ts"
)

function Should-SkipFile {
    param($filePath)
    foreach ($skip in $skipFiles) {
        if ($filePath -like "*$skip*") {
            return $true
        }
    }
    return $false
}

function Process-File {
    param($filePath)
    
    if (Should-SkipFile $filePath) {
        return
    }
    
    $content = Get-Content $filePath -Raw -Encoding UTF8
    $originalContent = $content
    $fileReplacements = 0
    
    foreach ($replacement in $replacements) {
        $matches = [regex]::Matches($content, $replacement.Pattern)
        if ($matches.Count -gt 0) {
            $content = $content -replace $replacement.Pattern, $replacement.Replacement
            $fileReplacements += $matches.Count
        }
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
        $script:filesProcessed++
        $script:totalReplacements += $fileReplacements
        $relativePath = $filePath.Replace((Get-Location).Path + "\", "")
        Write-Host "✓ $relativePath ($fileReplacements replacements)" -ForegroundColor Green
    }
}

Write-Host "🎨 Replacing hardcoded brand colors in dashboard codebase...`n" -ForegroundColor Cyan

foreach ($path in $paths) {
    $fullPath = Join-Path (Get-Location) $path
    if (Test-Path $fullPath) {
        $files = Get-ChildItem -Path $fullPath -Include *.tsx,*.ts -Recurse -File
        foreach ($file in $files) {
            Process-File $file.FullName
        }
    }
}

Write-Host "`n✅ Complete! Processed $filesProcessed files with $totalReplacements total replacements." -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Review changes with: git diff" -ForegroundColor White
Write-Host "2. Test the app to ensure colors work correctly" -ForegroundColor White
Write-Host "3. Test with custom branding in Settings → Branding" -ForegroundColor White
Write-Host "4. Commit changes: git add . && git commit -m 'Replace hardcoded colors with dynamic brand colors'" -ForegroundColor White
