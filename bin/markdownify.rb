require 'json'

@input_dir = ARGV[0]
@template_dir = ARGV[1] # /path/to/website-copy/automated-comments
return exit(-1) unless File.exist?(@input_dir)

input_path = File.join(@input_dir, 'analysis.json')
output_path = File.join(@input_dir, 'analysis.md')

analysis = JSON.parse(File.readlines(input_path).join("\n"))

def get_comment_template(identifier)
  return identifier unless /\A[a-z]+\.[a-z]+\.[a-z\-\._]+\z/.match?(identifier)
  parts = identifier.split('.')

  File.readlines(
    # assume language/folder/file.md
    File.join(@template_dir, parts[0], parts[1], "#{parts[2...].join('.')}.md")
  ).join('').chomp
end

File.open(output_path, 'w') do |f|
  f.puts "comment_count: #{analysis['comments'].length}"
  f.puts "---\n"
  f.puts "# Markdown output"

  analysis['comments'].each_with_index do |comment, i|
    comment = { 'comment' => comment, 'params': {} } if comment.is_a?(String)

    f.puts "\n## Comment #{i}\n\n"
    f.puts sprintf(get_comment_template(comment['comment']), (comment['params'] || {}).inject({}){ |memo,(k,v)| memo[k.to_sym] = v; memo })
  end
end

puts "=> converted #{analysis['comments'].length} comment(s)"
puts "=> written to '#{output_path}'"

exit(0)
