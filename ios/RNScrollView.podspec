require "json"

package = JSON.parse(File.read(File.join(__dir__, './../package.json')))

Pod::Spec.new do |s|
  s.name         = package['pod']
  s.version      = package["version"]
  s.summary      = package["description"]
  s.license      = package['license']
  s.homepage     = package['homepage']
  s.authors      = package['author']
  s.platforms    = { :ios => "7.0", :tvos => "9.0" }
  s.source       = { :git => "", :tag => s.version }
  s.source_files  = "**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
end
