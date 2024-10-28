$ports = @(3001, 3002, 3003, 3004, 3005)

foreach ($port in $ports) {
    $processId = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    if ($processId -and $processId -ne 0) {
        Write-Host "Killing process on port $port (PID: $processId)"
        try {
            Stop-Process -Id $processId -Force -ErrorAction Stop
            Write-Host "Successfully killed process on port $port"
        } catch {
            Write-Host "Could not kill process on port $port - $($_.Exception.Message)"
        }
    } else {
        Write-Host "No process found on port $port"
    }
}
