#!/bin/env ruby
# frozen_string_literal: true

require 'every_politician_scraper/comparison'

class Comparison < EveryPoliticianScraper::NulllessComparison
  ACCEPT = %w[Minister Ministra Ministro]

  def wikidata
    @wikidata ||= super.delete_if { |row| !ACCEPT.include? row[:position].split(' ').first }
  end

  def external
    @external ||= super.delete_if { |row| !ACCEPT.include? row[:position].split(' ').first }
  end
end

diff = Comparison.new('wikidata.csv', 'scraped.csv').diff
puts diff.sort_by { |r| [r.first, r[1].to_s] }.reverse.map(&:to_csv)
